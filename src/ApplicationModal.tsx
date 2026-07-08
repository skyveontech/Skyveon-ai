// ---------------------------------------------------------------------------
// Modal Component
// ---------------------------------------------------------------------------

import { useEffect, useRef, useState } from "react";
import { Loader2, X, CheckCircle2, Paperclip } from "lucide-react";

function ApplicationModal({
  isOpen,
  onClose,
  jobTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.2)",
          delay: 0.1,
        },
      );
    } else {
      document.body.style.overflow = "unset";
      setIsSuccess(false);
      setFileName(null);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Get all form fields (including the file)
      const formData = new window.FormData(e.currentTarget);
      
      // 2. Add the job title to the form data
      formData.append("jobTitle", jobTitle);

      // 3. Send to Vercel Serverless Function
      const response = await fetch("/api/apply", {
        method: "POST",
        // IMPORTANT: Do NOT set Content-Type header. 
        // The browser automatically sets it to multipart/form-data for file uploads.
        body: formData, 
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Application Error:", error);
      alert("Failed to send application. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/5">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md px-8 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Apply Now
            </p>
            <h3 className="text-lg font-bold text-slate-900">{jobTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">
                Application Sent!
              </h4>
              <p className="mt-2 text-slate-500 max-w-md">
                Thank you for applying to Skyveon. Our talent team will review
                your profile and reach out if there's a match.
              </p>
              <button
                onClick={onClose}
                className="mt-8 rounded-xl bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-800">
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-semibold text-slate-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-semibold text-slate-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-slate-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold text-slate-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    id="phone"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="linkedin"
                  className="text-sm font-semibold text-slate-700">
                  LinkedIn URL <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="url"
                  name="linkedin"
                  id="linkedin"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Resume / CV <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center justify-center w-full">
                  <label
                    htmlFor="resume"
                    className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-orange-400 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Paperclip className="w-6 h-6 mb-2 text-slate-400" />
                      <p className="mb-1 text-sm text-slate-600 font-medium">
                        {fileName ? fileName : "Click to upload your resume"}
                      </p>
                      <p className="text-xs text-slate-400">
                        PDF, DOCX, or TXT (Max 5MB)
                      </p>
                    </div>
                    <input
                      required
                      type="file"
                      name="resume"
                      id="resume"
                      accept=".pdf,.doc,.docx,.txt"
                      className="hidden"
                      onChange={(e) =>
                        setFileName(e.target.files?.[0]?.name || null)
                      }
                    />
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3.5 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-orange-500/40 disabled:opacity-70 disabled:hover:translate-y-0">
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}