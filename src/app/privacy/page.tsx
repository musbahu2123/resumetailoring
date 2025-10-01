// app/privacy/page.tsx
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 mb-4">
                We collect minimal information to provide our resume tailoring
                service:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Email address for account creation</li>
                <li>Resume content you upload or paste</li>
                <li>Job descriptions you provide for tailoring</li>
                <li>Usage data to improve our service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-4">
                Your data is used solely to provide and improve our resume
                tailoring service:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Generate tailored resumes and cover letters</li>
                <li>Provide ATS optimization scores</li>
                <li>Improve our AI algorithms</li>
                <li>Send service-related notifications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                3. Data Security
              </h2>
              <p className="text-gray-600">
                We implement industry-standard security measures to protect your
                data. Your resume files and personal information are encrypted
                and processed securely.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                4. Data Retention
              </h2>
              <p className="text-gray-600">
                We retain your resume data only as long as necessary to provide
                our service. You can delete your documents and account at any
                time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                5. Contact Us
              </h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <p className="text-blue-600 mt-2">resumetailorapp@gmail.com</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
