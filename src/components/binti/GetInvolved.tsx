'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Heart, HandHeart, Users, Share2, Send, MapPin, Phone, Mail,
  Instagram, Facebook, Twitter, Banknote, Smartphone, Building2,
  CheckCircle2, Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const nairobiSubCounties = [
  'Westlands', 'Dagoretti North', 'Dagoretti South', 'Langata', 'Kibra',
  'Roysambu', 'Kasarani', 'Ruaraka', 'Embakasi Central', 'Embakasi North',
  'Embakasi South', 'Embakasi West', 'Embakasi East', 'Makadara', 'Kamukunji',
  'Starehe', 'Mathare',
];

const partnershipTypes = [
  'Capacity Building',
  'Funding',
  'Technical Support',
  'Research',
  'Advocacy',
];

const skillOptions = [
  'Facilitation', 'Mentoring', 'Counseling', 'Data Collection',
  'Communications', 'IT & Design', 'Finance', 'Legal',
  'Photography/Video', 'Event Planning', 'First Aid', 'Other',
];

export default function GetInvolved() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('donate');

  // Volunteer form state
  const [volunteerForm, setVolunteerForm] = useState({
    name: '', email: '', phone: '', county: '', skills: [] as string[], availability: '', message: '',
  });
  const [partnerForm, setPartnerForm] = useState({
    orgName: '', contactPerson: '', email: '', phone: '', partnershipType: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const addSkill = (skill: string) => {
    if (!volunteerForm.skills.includes(skill) && volunteerForm.skills.length < 5) {
      setVolunteerForm(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
    setSkillInput('');
  };

  const removeSkill = (skill: string) => {
    setVolunteerForm(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const filteredSkills = skillOptions.filter(
    s => s.toLowerCase().includes(skillInput.toLowerCase()) && !volunteerForm.skills.includes(s)
  );

  const handleSubmitVolunteer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting('volunteer');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'volunteer',
          name: volunteerForm.name,
          email: volunteerForm.email,
          phone: volunteerForm.phone,
          county: volunteerForm.county,
          skills: volunteerForm.skills.join(', '),
          availability: volunteerForm.availability,
          message: volunteerForm.message,
        }),
      });
      if (res.ok) {
        setSubmitted('volunteer');
        setVolunteerForm({ name: '', email: '', phone: '', county: '', skills: [], availability: '', message: '' });
      }
    } catch {
      // Error handling
    } finally {
      setIsSubmitting('');
    }
  };

  const handleSubmitPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting('partner');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'partner',
          name: partnerForm.orgName,
          email: partnerForm.email,
          phone: partnerForm.phone,
          contactPerson: partnerForm.contactPerson,
          partnershipType: partnerForm.partnershipType,
          message: partnerForm.message,
        }),
      });
      if (res.ok) {
        setSubmitted('partner');
        setPartnerForm({ orgName: '', contactPerson: '', email: '', phone: '', partnershipType: '', message: '' });
      }
    } catch {
      // Error handling
    } finally {
      setIsSubmitting('');
    }
  };

  return (
    <section id="get-involved" ref={sectionRef} className="py-20 md:py-28 bg-white border-b border-ink/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Act heading */}
        <div className={`max-w-3xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-voilet mb-4">
            Act VI · Join the Journey
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink leading-[1.1]">
            Add your voice to the <em className="text-voilet">rising.</em>
          </h2>
          <p className="mt-5 text-mist text-base sm:text-lg leading-relaxed">
            Whether you donate, volunteer, or partner with us — every action counts in empowering
            young women across Nairobi.
          </p>
        </div>

        {/* Quick Ways to Help — index cards */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/10 border border-ink/10 mt-12 ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
          {[
            { icon: Heart, title: 'Donate', desc: 'Every KES transforms lives', onClick: () => setActiveTab('donate') },
            { icon: HandHeart, title: 'Volunteer', desc: 'Share your skills and time', onClick: () => setActiveTab('volunteer') },
            { icon: Users, title: 'Partner', desc: 'Collaborate for impact', onClick: () => setActiveTab('partner') },
            { icon: Share2, title: 'Share', desc: 'Spread the word', onClick: () => {} },
          ].map((way) => (
            <button
              key={way.title}
              onClick={way.onClick}
              className="group p-5 bg-white hover:bg-cream transition-colors text-left"
            >
              <way.icon className="w-5 h-5 text-voilet mb-3" aria-hidden="true" />
              <h4 className="font-medium text-ink mb-1">{way.title}</h4>
              <p className="text-xs text-mist leading-relaxed">{way.desc}</p>
            </button>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-10">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto rounded-none border border-ink/15 bg-cream">
            <TabsTrigger value="donate" className="rounded-none text-sm font-medium data-[state=active]:bg-ink data-[state=active]:text-cream">
              <Banknote className="w-4 h-4 mr-1.5" aria-hidden="true" />
              Donate
            </TabsTrigger>
            <TabsTrigger value="volunteer" className="rounded-none text-sm font-medium data-[state=active]:bg-ink data-[state=active]:text-cream">
              <HandHeart className="w-4 h-4 mr-1.5" aria-hidden="true" />
              Volunteer
            </TabsTrigger>
            <TabsTrigger value="partner" className="rounded-none text-sm font-medium data-[state=active]:bg-ink data-[state=active]:text-cream">
              <Users className="w-4 h-4 mr-1.5" aria-hidden="true" />
              Partner
            </TabsTrigger>
          </TabsList>

          {/* Donate Tab */}
          <TabsContent value="donate">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 mt-6">
              {/* M-Pesa */}
              <div className="bg-cream border border-ink/10 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 bg-ink text-cream flex items-center justify-center">
                    <Smartphone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-ink">M-Pesa (Lipa na M-Pesa)</h3>
                    <p className="text-sm text-mist">Every KES counts</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-white border border-ink/10">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-mist mb-1">Paybill Number</div>
                    <div className="font-display text-3xl text-ink">123456</div>
                  </div>
                  <div className="p-4 bg-white border border-ink/10">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-mist mb-1">Account Number</div>
                    <div className="font-display text-2xl text-voilet">BINTI</div>
                  </div>
                  <p className="p-3 border-l-2 border-voilet bg-white/60 text-xs text-mist leading-relaxed">
                    Go to M-Pesa &gt; Lipa na M-Pesa &gt; Paybill &gt; Enter 123456 &gt; Account: BINTI &gt; Enter Amount &gt; Confirm
                  </p>
                </div>
              </div>

              {/* Bank Transfer */}
              <div className="bg-cream border border-ink/10 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 bg-ink text-cream flex items-center justify-center">
                    <Building2 className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-ink">Bank Transfer</h3>
                    <p className="text-sm text-mist">Direct bank deposit</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-white border border-ink/10">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-mist mb-1">Bank</div>
                    <div className="text-lg font-medium text-ink">Kenya Commercial Bank (KCB)</div>
                  </div>
                  <div className="p-4 bg-white border border-ink/10">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-mist mb-1">Account Name</div>
                    <div className="text-lg font-medium text-ink">BINTI Rising Initiative</div>
                  </div>
                  <div className="p-4 bg-white border border-ink/10">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-mist mb-1">Branch</div>
                    <div className="text-lg font-medium text-ink">Nairobi Main</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Donation Impact — ink plate */}
            <div className="mt-8 bg-ink text-cream p-6 sm:p-8">
              <h3 className="font-display text-2xl text-center mb-6 flex items-center justify-center gap-3">
                <Heart className="w-5 h-5 text-flamingo" aria-hidden="true" />
                Your Donation&apos;s Impact
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/15 border border-cream/15">
                {[
                  { amount: 'KES 1,000', impact: '1 training session for a young woman' },
                  { amount: 'KES 5,000', impact: 'Complete pillar training (6-8 sessions)' },
                  { amount: 'KES 10,000', impact: 'Materials for a cohort of 20 participants' },
                  { amount: 'KES 20,000', impact: 'Sponsor an entire cohort of 20 young women' },
                ].map((tier) => (
                  <div key={tier.amount} className="bg-ink p-4 text-center">
                    <div className="font-display text-lg text-flamingo">{tier.amount}</div>
                    <div className="text-cream/70 text-xs mt-1.5 leading-relaxed">{tier.impact}</div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <Button
                  size="lg"
                  className="bg-cream text-ink hover:bg-cream/90 rounded-none px-10 min-h-[48px] tracking-wide"
                >
                  Donate Now — Change a Life
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Volunteer Tab */}
          <TabsContent value="volunteer">
            <div className="max-w-2xl mx-auto mt-6">
              <div className="bg-cream border border-ink/10 p-6 sm:p-8">
                <h3 className="font-display text-2xl text-ink mb-2">Volunteer With Us</h3>
                <p className="text-sm text-mist mb-6">
                  Join our mission in Nairobi. Fill out the form below and we&apos;ll get back to you within 48 hours.
                </p>

                {submitted === 'volunteer' ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-ink mb-4">
                      <CheckCircle2 className="w-7 h-7 text-cream" aria-hidden="true" />
                    </div>
                    <h4 className="font-display text-xl text-ink mb-2">Application Submitted!</h4>
                    <p className="text-sm text-mist">
                      Thank you for volunteering! We&apos;ll review your application and reach out soon.
                    </p>
                    <Button
                      onClick={() => setSubmitted('')}
                      variant="outline"
                      className="mt-4 border-ink/25 text-ink hover:bg-ink/5 rounded-none"
                    >
                      Submit Another Application
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitVolunteer} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="v-name">Full Name *</Label>
                        <Input
                          id="v-name"
                          placeholder="Your name"
                          value={volunteerForm.name}
                          onChange={(e) => setVolunteerForm(prev => ({ ...prev, name: e.target.value }))}
                          required
                          className="border-ink/20 focus:border-voilet focus:ring-voilet/20 rounded-none bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="v-email">Email Address *</Label>
                        <Input
                          id="v-email"
                          type="email"
                          placeholder="your@email.com"
                          value={volunteerForm.email}
                          onChange={(e) => setVolunteerForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="border-ink/20 focus:border-voilet focus:ring-voilet/20 rounded-none bg-white"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="v-phone">Phone Number *</Label>
                        <Input
                          id="v-phone"
                          placeholder="+254 7XX XXX XXX"
                          value={volunteerForm.phone}
                          onChange={(e) => setVolunteerForm(prev => ({ ...prev, phone: e.target.value }))}
                          required
                          className="border-ink/20 focus:border-voilet focus:ring-voilet/20 rounded-none bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="v-county">Sub-County in Nairobi *</Label>
                        <select
                          id="v-county"
                          value={volunteerForm.county}
                          onChange={(e) => setVolunteerForm(prev => ({ ...prev, county: e.target.value }))}
                          required
                          className="w-full h-10 rounded-none border border-ink/20 bg-white px-3 py-2 text-sm focus:border-voilet focus:ring-voilet/20 focus:outline-none"
                        >
                          <option value="">Select sub-county</option>
                          {nairobiSubCounties.map((sc) => (
                            <option key={sc} value={sc}>{sc}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Skills multi-select */}
                    <div className="space-y-2">
                      <Label>Skills (up to 5) *</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {volunteerForm.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-voilet/10 text-voilet border border-voilet/25 rounded-none cursor-pointer hover:bg-voilet/20"
                            onClick={() => removeSkill(skill)}
                          >
                            {skill} ×
                          </Badge>
                        ))}
                      </div>
                      <Input
                        placeholder="Type to search skills..."
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onFocus={() => setSkillInput(' ')}
                        className="border-ink/20 focus:border-voilet focus:ring-voilet/20 rounded-none bg-white"
                        aria-label="Search skills"
                      />
                      {skillInput && filteredSkills.length > 0 && (
                        <div className="bg-white border border-ink/15 shadow-lg max-h-32 overflow-y-auto custom-scrollbar">
                          {filteredSkills.map((skill) => (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => addSkill(skill)}
                              className="w-full text-left px-3 py-2 text-sm text-mist hover:bg-cream hover:text-ink transition-colors"
                            >
                              + {skill}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="v-availability">Availability *</Label>
                      <select
                        id="v-availability"
                        value={volunteerForm.availability}
                        onChange={(e) => setVolunteerForm(prev => ({ ...prev, availability: e.target.value }))}
                        required
                        className="w-full h-10 rounded-none border border-ink/20 bg-white px-3 py-2 text-sm focus:border-voilet focus:ring-voilet/20 focus:outline-none"
                      >
                        <option value="">Select availability</option>
                        <option value="Weekdays (Morning)">Weekdays (Morning)</option>
                        <option value="Weekdays (Afternoon)">Weekdays (Afternoon)</option>
                        <option value="Weekends">Weekends</option>
                        <option value="Flexible">Flexible</option>
                        <option value="One-time events">One-time events only</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="v-message">Message (optional)</Label>
                      <Textarea
                        id="v-message"
                        placeholder="Tell us about yourself and why you want to volunteer..."
                        rows={3}
                        value={volunteerForm.message}
                        onChange={(e) => setVolunteerForm(prev => ({ ...prev, message: e.target.value }))}
                        className="border-ink/20 focus:border-voilet focus:ring-voilet/20 rounded-none bg-white resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting === 'volunteer'}
                      className="w-full bg-ink text-cream hover:bg-ink/85 rounded-none py-6 tracking-wide"
                    >
                      {isSubmitting === 'volunteer' ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" aria-hidden="true" />
                          Submit Volunteer Application
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Partner Tab */}
          <TabsContent value="partner">
            <div className="max-w-2xl mx-auto mt-6">
              <div className="bg-cream border border-ink/10 p-6 sm:p-8">
                <h3 className="font-display text-2xl text-ink mb-2">Partner With Us</h3>
                <p className="text-sm text-mist mb-6">
                  We welcome partnerships with NGOs, government agencies, private sector, and academic
                  institutions working in Nairobi.
                </p>

                {submitted === 'partner' ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-ink mb-4">
                      <CheckCircle2 className="w-7 h-7 text-cream" aria-hidden="true" />
                    </div>
                    <h4 className="font-display text-xl text-ink mb-2">Inquiry Submitted!</h4>
                    <p className="text-sm text-mist">
                      Thank you for your interest in partnering with Binti Rising. We&apos;ll be in touch soon.
                    </p>
                    <Button
                      onClick={() => setSubmitted('')}
                      variant="outline"
                      className="mt-4 border-ink/25 text-ink hover:bg-ink/5 rounded-none"
                    >
                      Submit Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitPartner} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="p-org">Organization Name *</Label>
                      <Input
                        id="p-org"
                        placeholder="Your organization"
                        value={partnerForm.orgName}
                        onChange={(e) => setPartnerForm(prev => ({ ...prev, orgName: e.target.value }))}
                        required
                        className="border-ink/20 focus:border-voilet focus:ring-voilet/20 rounded-none bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="p-contact">Contact Person *</Label>
                      <Input
                        id="p-contact"
                        placeholder="Full name of contact person"
                        value={partnerForm.contactPerson}
                        onChange={(e) => setPartnerForm(prev => ({ ...prev, contactPerson: e.target.value }))}
                        required
                        className="border-ink/20 focus:border-voilet focus:ring-voilet/20 rounded-none bg-white"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="p-email">Email Address *</Label>
                        <Input
                          id="p-email"
                          type="email"
                          placeholder="contact@org.com"
                          value={partnerForm.email}
                          onChange={(e) => setPartnerForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="border-ink/20 focus:border-voilet focus:ring-voilet/20 rounded-none bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="p-phone">Phone Number *</Label>
                        <Input
                          id="p-phone"
                          placeholder="+254 7XX XXX XXX"
                          value={partnerForm.phone}
                          onChange={(e) => setPartnerForm(prev => ({ ...prev, phone: e.target.value }))}
                          required
                          className="border-ink/20 focus:border-voilet focus:ring-voilet/20 rounded-none bg-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="p-type">Partnership Type *</Label>
                      <select
                        id="p-type"
                        value={partnerForm.partnershipType}
                        onChange={(e) => setPartnerForm(prev => ({ ...prev, partnershipType: e.target.value }))}
                        required
                        className="w-full h-10 rounded-none border border-ink/20 bg-white px-3 py-2 text-sm focus:border-voilet focus:ring-voilet/20 focus:outline-none"
                      >
                        <option value="">Select partnership type</option>
                        {partnershipTypes.map((pt) => (
                          <option key={pt} value={pt}>{pt}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="p-message">Message *</Label>
                      <Textarea
                        id="p-message"
                        placeholder="Tell us about your organization and the partnership you envision..."
                        rows={4}
                        value={partnerForm.message}
                        onChange={(e) => setPartnerForm(prev => ({ ...prev, message: e.target.value }))}
                        required
                        className="border-ink/20 focus:border-voilet focus:ring-voilet/20 rounded-none bg-white resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting === 'partner'}
                      className="w-full bg-ink text-cream hover:bg-ink/85 rounded-none py-6 tracking-wide"
                    >
                      {isSubmitting === 'partner' ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" aria-hidden="true" />
                          Submit Partnership Inquiry
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Contact strip — ink plate */}
        <div className={`mt-12 ${isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
          <div className="p-8 bg-ink text-cream">
            <h4 className="font-display text-xl mb-5 text-center">Contact Information</h4>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-flamingo shrink-0" aria-hidden="true" />
                <span className="text-sm text-cream/80">Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-flamingo shrink-0" aria-hidden="true" />
                <span className="text-sm text-cream/80">+254 700 000 000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-flamingo shrink-0" aria-hidden="true" />
                <span className="text-sm text-cream/80">info@bintirising.org</span>
              </div>
            </div>
            {/* Social Links */}
            <div className="mt-5 flex justify-center gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
              ].map((social) => (
                <button
                  key={social.label}
                  aria-label={social.label}
                  className="w-10 h-10 bg-cream/10 hover:bg-voilet flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-4 h-4" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
