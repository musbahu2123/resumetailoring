// app/cookies/page.tsx
export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Cookie Policy
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                What Are Cookies
              </h2>
              <p className="text-gray-600">
                Cookies are small text files stored on your device when you
                visit our website. They help us provide and improve our
                services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                How We Use Cookies
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Authentication - To keep you signed in</li>
                <li>Preferences - To remember your settings</li>
                <li>Analytics - To understand how you use our service</li>
                <li>Security - To protect your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Managing Cookies
              </h2>
              <p className="text-gray-600">
                You can control cookies through your browser settings. However,
                disabling cookies may affect your ability to use our service.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
