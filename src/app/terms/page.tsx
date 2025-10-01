// app/terms/page.tsx
export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Terms of Service
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600">
                By accessing and using ResumeTailor, you accept and agree to be
                bound by these Terms of Service. If you do not agree to these
                terms, please do not use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. Service Description
              </h2>
              <p className="text-gray-600 mb-4">
                ResumeTailor provides AI-powered resume and cover letter
                tailoring services. We help optimize your job application
                materials for Applicant Tracking Systems (ATS) and recruiters.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                3. User Accounts
              </h2>
              <p className="text-gray-600 mb-4">
                To use our service, you must create an account using your email
                or Google account. You are responsible for maintaining the
                confidentiality of your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                4. Credits and Usage
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>New users receive 10 free credits</li>
                <li>Each resume tailoring session uses 1 credit</li>
                <li>Credits do not expire</li>
                <li>
                  We reserve the right to modify credit policies with notice
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                5. User Responsibilities
              </h2>
              <p className="text-gray-600 mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>
                  Upload content that violates intellectual property rights
                </li>
                <li>Use the service for any illegal purpose</li>
                <li>Attempt to circumvent our security measures</li>
                <li>Share your account with others</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-gray-600">
                ResumeTailor provides AI-generated suggestions. We do not
                guarantee job offers or interview calls. You are responsible for
                reviewing and verifying all generated content before use.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                7. Service Modifications
              </h2>
              <p className="text-gray-600">
                We reserve the right to modify or discontinue our service at any
                time. We will provide notice of significant changes to these
                terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                8. Contact
              </h2>
              <p className="text-gray-600">
                Questions about these Terms of Service? Contact us at:
              </p>
              <p className="text-blue-600 mt-2">resumetailorapp@gmail.com</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
