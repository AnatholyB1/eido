// pages/privacy-policy.js
import Link from 'next/link';
import '@/app/globals.css'

export default function PrivacyPolicyPage() {
  return (
    <div className="prose lg:prose-lg mx-auto p-4 space-y-6">
      <Link href="/">
        <a className="inline-block mb-4 px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          Back to Home
        </a>
      </Link>
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="text-lg">
        At Eido, we respect your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website eido-xi.vercel.app.
      </p>
      <p className="text-lg">
        Please read this Privacy Policy carefully. IF YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, PLEASE DO NOT ACCESS THE SITE.
      </p>
      <h2 className="text-2xl font-bold">Personal Data</h2>
      <p className="text-lg">
        We collect personal data from you when you voluntarily provide such information, such as when you contact us with inquiries, respond to one of our surveys, register for access to the Services or use certain Services.
      </p>
      <h2 className="text-2xl font-bold">Usage Data</h2>
      <p className="text-lg">
        We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
      </p>
      <h2 className="text-2xl font-bold">Cookies Data</h2>
      <p className="text-lg">
        We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device.
      </p>
    </div>
  );
}