"use client";

/**
 * get-involved.tsx: Act VI · Join the Journey.
 *
 * Four support routes (Donate / Volunteer / Partner / Share) as accessible
 * tabs, with M-Pesa & bank details, copy-to-clipboard helpers, and the
 * donation impact tiers. Every control meets the 44px touch-target minimum.
 */

import { HandHeart, Handshake, Share2, HeartHandshake, Copy, Phone, Mail } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CONTACT, DONATION_TIERS } from "@/lib/story-data";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Clipboard API can be unavailable on http or older browsers; ignore.
  }
}

function CopyField({ label, value }: { label: string; value: string }) {
  const { toast } = useToast();
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-[#1a1626]/15 bg-white/70 px-4 py-3">
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#6f6a7c]">{label}</p>
        <p className="truncate font-mono text-base font-bold text-[#1a1626]">{value}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="min-h-[44px] shrink-0 border-[#1a1626]/25"
        onClick={async () => {
          await copyText(value);
          toast({ title: "Copied", description: `${label}: ${value}` });
        }}
      >
        <Copy className="size-4" aria-hidden="true" />
        <span className="sr-only">Copy {label}</span>
      </Button>
    </div>
  );
}

const TABS = [
  { value: "donate", label: "Donate", icon: HandHeart, blurb: "Every KES transforms lives" },
  { value: "volunteer", label: "Volunteer", icon: HeartHandshake, blurb: "Share your skills and time" },
  { value: "partner", label: "Partner", icon: Handshake, blurb: "Collaborate for impact" },
  { value: "share", label: "Share", icon: Share2, blurb: "Spread the word" },
] as const;

export function GetInvolved() {
  const { toast } = useToast();

  return (
    <Tabs defaultValue="donate" className="w-full">
      {/* Tab strip: Flexbox, scrollable on very small screens */}
      <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-md border border-[#1a1626]/10 bg-white/60 p-1 sm:inline-flex">
        {TABS.map(({ value, label, icon: Icon, blurb }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="min-h-[44px] gap-2 px-4 data-[state=active]:bg-[#1a1626] data-[state=active]:text-[#f6f3ee]"
          >
            <Icon className="size-4" aria-hidden="true" />
            <span className="flex flex-col items-start leading-none">
              <span>{label}</span>
              <span className="mt-0.5 hidden text-[9px] font-normal opacity-70 sm:block">{blurb}</span>
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      {/* DONATE */}
      <TabsContent value="donate" className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#b4472e]">
            M-Pesa (Lipa na M-Pesa)
          </h4>
          <CopyField label="Paybill Number" value={CONTACT.mpesaPaybill} />
          <CopyField label="Account Number" value={CONTACT.mpesaAccount} />
          <p className="rounded-md bg-[#1a1626]/5 px-4 py-3 text-xs leading-relaxed text-[#6f6a7c]">
            Go to M-Pesa &gt; Lipa na M-Pesa &gt; Paybill &gt; Enter{" "}
            <strong className="text-[#1a1626]">{CONTACT.mpesaPaybill}</strong> &gt; Account:{" "}
            <strong className="text-[#1a1626]">{CONTACT.mpesaAccount}</strong> &gt; Enter Amount
            &gt; Confirm
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#b4472e]">
            Your Donation&apos;s Impact
          </h4>
          <ul className="divide-y divide-[#1a1626]/10 rounded-md border border-[#1a1626]/10 bg-white/60">
            {DONATION_TIERS.map((tier) => (
              <li key={tier.amount} className="flex items-baseline gap-3 px-4 py-2.5 text-sm">
                <span className="w-24 shrink-0 font-bold text-[#1a1626]">{tier.amount}</span>
                <span className="text-[#6f6a7c]">{tier.what}</span>
              </li>
            ))}
          </ul>
        </div>
      </TabsContent>

      {/* VOLUNTEER */}
      <TabsContent value="volunteer" className="mt-6">
        <div className="rounded-md border border-[#1a1626]/10 bg-white/60 p-6">
          <p className="max-w-2xl text-sm leading-relaxed text-[#6f6a7c]">
            Facilitators, peer mentors, creatives, and M&amp;E volunteers keep the Journey to
            Wholeness running. Whether you can give a single session or a full six-month cycle,
            there is a place for your skills.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-[#b4472e] text-[#f6f3ee] hover:bg-[#b4472e]/85 min-h-[44px]"
            >
              <a href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}>
                <Phone className="size-4" aria-hidden="true" />
                WhatsApp {CONTACT.whatsapp}
              </a>
            </Button>
            <Button asChild variant="outline" className="border-[#1a1626]/25 min-h-[44px]">
              <a href={`mailto:${CONTACT.email}?subject=Volunteering%20with%20Binti%20Rising`}>
                <Mail className="size-4" aria-hidden="true" />
                {CONTACT.email}
              </a>
            </Button>
          </div>
        </div>
      </TabsContent>

      {/* PARTNER */}
      <TabsContent value="partner" className="mt-6">
        <div className="rounded-md border border-[#1a1626]/10 bg-white/60 p-6">
          <p className="max-w-2xl text-sm leading-relaxed text-[#6f6a7c]">
            We collaborate with health facilities, schools, youth networks, and funders across
            Nairobi. As a registered CBO ({CONTACT.registration}, Kiambu) with evidence-based
            programming aligned to the UN Sustainable Development Goals, we offer transparent
            reporting, verified photography, and rigorous M&amp;E for every partnership.
          </p>
          <Button asChild className="mt-4 bg-[#b4472e] text-[#f6f3ee] hover:bg-[#b4472e]/85 min-h-[44px]">
            <a href={`mailto:${CONTACT.email}?subject=Partnership%20with%20Binti%20Rising`}>
              <Mail className="size-4" aria-hidden="true" />
              Start a conversation
            </a>
          </Button>
        </div>
      </TabsContent>

      {/* SHARE */}
      <TabsContent value="share" className="mt-6">
        <div className="rounded-md border border-[#1a1626]/10 bg-white/60 p-6">
          <p className="max-w-2xl text-sm leading-relaxed text-[#6f6a7c]">
            Voices carry further than flyers. Share the monograph with a friend, a school, a
            community group. Awareness is the first act of the journey.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="border-[#1a1626]/25 min-h-[44px]"
              onClick={async () => {
                const shareData = {
                  title: "Binti Rising: From Silence, She Rises",
                  text: "A photographic monograph from the Binti Rising Initiative, Nairobi.",
                  url: typeof window !== "undefined" ? window.location.origin : "",
                };
                if (typeof navigator.share === "function") {
                  try {
                    await navigator.share(shareData);
                  } catch {
                    /* reader dismissed the share sheet */
                  }
                } else {
                  await copyText(shareData.url);
                  toast({ title: "Link copied", description: "Paste it anywhere to share." });
                }
              }}
            >
              <Share2 className="size-4" aria-hidden="true" />
              Share the monograph
            </Button>
            <Button asChild variant="outline" className="border-[#1a1626]/25 min-h-[44px]">
              <a href="/binti-rising-monograph.pdf" download>
                Download the PDF
              </a>
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
