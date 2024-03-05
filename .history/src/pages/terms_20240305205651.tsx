// pages/terms.js
import Link from 'next/link';
import './globals.css'
export default function TermsPage() {
    return (
        <div className="prose lg:prose-lg mx-auto p-4 space-y-6">
            <Link href="/">
                <span className="inline-block mb-4 px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    Back to Home
                </span>
            </Link>
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="text-lg">
        These Terms of Service govern your use of our website located at eido-xi.vercel.app and form a binding contractual agreement between you, the user of the Site and us, Anatholy BRICON.
      </p>
      <p className="text-lg">
        For that reason, these Terms are important and you should ensure that you read them carefully and contact us with any questions before you use the Site.
      </p>
      <p className="text-lg">
        By using the Site you acknowledge and agree that you have had sufficient chance to read and understand the Terms and you agree to be bound by them. If you do not agree to the Terms, please do not use the Site.
      </p>
      <h2 className="text-2xl font-bold">Usage of the Site</h2>
      <p className="text-lg">
        The Site is provided for personal, non-commercial use. You agree to use the Site only for lawful purposes and not to use the Site in any way that might harm, abuse, or disparage any other party.
      </p>
      <h2 className="text-2xl font-bold">Intellectual Property</h2>
      <p className="text-lg">
        All content, design, graphics, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary rights. Copying, redistribution or publication of any such content is strictly prohibited without the express written consent of Anatholy BRICON.
      </p>
    </div>
  );
}