// lib/credits.ts
import User from "@/models/user";
import dbConnect from "@/lib/dbConnect";

export async function checkAndResetMonthlyCredits(userId: string) {
  await dbConnect();

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const now = new Date();
  const lastReset = user.lastCreditReset;

  // Check if we're in a different month/year
  if (
    now.getMonth() !== lastReset.getMonth() ||
    now.getFullYear() !== lastReset.getFullYear()
  ) {
    user.credits = 3;
    user.lastCreditReset = now;
    await user.save();
    return { reset: true, credits: 3 };
  }

  return { reset: false, credits: user.credits };
}

export async function deductCredit(userId: string) {
  await dbConnect();

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Check and reset if needed
  await checkAndResetMonthlyCredits(userId);

  // Refresh user data
  const updatedUser = await User.findById(userId);
  if (!updatedUser) throw new Error("User not found");

  if (updatedUser.credits <= 0) {
    throw new Error(
      "Monthly credits exhausted. Upgrade to Pro or wait till next month"
    );
  }

  updatedUser.credits -= 1;
  await updatedUser.save();

  return updatedUser.credits;
}

export async function getRemainingCredits(userId: string) {
  await dbConnect();

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  await checkAndResetMonthlyCredits(userId);

  const updatedUser = await User.findById(userId);
  return updatedUser?.credits || 0;
}
