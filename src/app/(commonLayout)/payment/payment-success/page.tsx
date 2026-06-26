import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-lg">
        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-01/10">
          <CheckCircle2 className="h-12 w-12 text-primary-01" />
        </div>

        {/* Content */}
        <h1 className="mt-6 text-3xl font-bold text-black">
          Payment Successful!
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          Your payment has been completed successfully. Thank you for your
          purchase.
        </p>

        {/* Payment Badge */}
        <div className="mt-6 inline-flex items-center rounded-full bg-secondary-01/10 px-4 py-2 text-sm font-medium text-primary-01">
          Transaction Completed
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gray-200" />

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="rounded-xl bg-primary-01 px-5 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-gray-300 px-5 py-3 font-medium text-black transition hover:bg-gray-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;