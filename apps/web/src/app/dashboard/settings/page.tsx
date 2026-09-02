"use client";

import { useState } from "react";
import {
  Bell,
  Building2,
  Globe,
  Lock,
  Save,
  User,
} from "lucide-react";

type SettingsSection =
  | "general"
  | "profile"
  | "notifications"
  | "security";

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("general");

  const [gymName, setGymName] = useState("VERTEXworkout");
  const [email, setEmail] = useState("admin@vertexworkout.com");
  const [phone, setPhone] = useState("+20 100 000 0000");
  const [location, setLocation] = useState("Alexandria, Egypt");
  const [language, setLanguage] = useState("English");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [bookingNotifications, setBookingNotifications] =
    useState(true);
  const [paymentNotifications, setPaymentNotifications] =
    useState(true);

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#022859]">
          Settings
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your gym settings, profile and preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
          <SettingsNavItem
            icon={Building2}
            label="General"
            active={activeSection === "general"}
            onClick={() => setActiveSection("general")}
          />

          <SettingsNavItem
            icon={User}
            label="Profile"
            active={activeSection === "profile"}
            onClick={() => setActiveSection("profile")}
          />

          <SettingsNavItem
            icon={Bell}
            label="Notifications"
            active={activeSection === "notifications"}
            onClick={() => setActiveSection("notifications")}
          />

          <SettingsNavItem
            icon={Lock}
            label="Security"
            active={activeSection === "security"}
            onClick={() => setActiveSection("security")}
          />
        </aside>

        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          {activeSection === "general" && (
            <div>
              <SectionHeader
                icon={Building2}
                title="General Settings"
                description="Configure your gym information and regional preferences."
              />

              <div className="space-y-5 p-6">
                <FormField
                  label="Gym Name"
                  value={gymName}
                  onChange={setGymName}
                  placeholder="Enter gym name"
                />

                <FormField
                  label="Location"
                  value={location}
                  onChange={setLocation}
                  placeholder="Enter location"
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Language
                  </label>

                  <select
                    value={language}
                    onChange={(event) =>
                      setLanguage(event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#022859] focus:ring-2 focus:ring-[#022859]/10"
                  >
                    <option>English</option>
                    <option>Arabic</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === "profile" && (
            <div>
              <SectionHeader
                icon={User}
                title="Admin Profile"
                description="Manage the administrator contact information."
              />

              <div className="space-y-5 p-6">
                <FormField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="admin@example.com"
                />

                <FormField
                  label="Phone"
                  value={phone}
                  onChange={setPhone}
                  placeholder="+20 000 000 0000"
                />

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm font-medium text-[#022859]">
                    Administrator
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    You are currently managing the VERTEXworkout
                    dashboard.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div>
              <SectionHeader
                icon={Bell}
                title="Notifications"
                description="Choose which dashboard notifications you want to receive."
              />

              <div className="divide-y divide-gray-100">
                <ToggleRow
                  title="Email Notifications"
                  description="Receive important system updates by email."
                  checked={emailNotifications}
                  onChange={setEmailNotifications}
                />

                <ToggleRow
                  title="Booking Notifications"
                  description="Get notified when a new booking is created."
                  checked={bookingNotifications}
                  onChange={setBookingNotifications}
                />

                <ToggleRow
                  title="Payment Notifications"
                  description="Get notified about new and updated payments."
                  checked={paymentNotifications}
                  onChange={setPaymentNotifications}
                />
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div>
              <SectionHeader
                icon={Lock}
                title="Security"
                description="Manage your account security settings."
              />

              <div className="space-y-5 p-6">
                <div className="rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    <Lock
                      size={20}
                      className="text-[#022859]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Password
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Change your administrator password.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-4 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-[#022859] transition hover:bg-gray-50"
                  >
                    Change Password
                  </button>
                </div>

                <div className="rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    <Globe
                      size={20}
                      className="text-[#022859]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Session Security
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Your dashboard session is protected by the
                        application authentication layer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 border-t border-gray-100 p-5">
            {saved && (
              <span className="text-sm font-medium text-green-600">
                Changes saved successfully
              </span>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl bg-[#022859] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#03356f]"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function SettingsNavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
        active
          ? "bg-[#022859] text-white"
          : "text-gray-600 hover:bg-gray-50 hover:text-[#022859]"
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-gray-100 p-6">
      <div className="rounded-xl bg-[#022859]/10 p-3 text-[#022859]">
        <Icon size={20} />
      </div>

      <div>
        <h2 className="font-semibold text-[#022859]">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#022859] focus:ring-2 focus:ring-[#022859]/10"
      />
    </div>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-6">
      <div>
        <p className="text-sm font-medium text-gray-800">
          {title}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-[#022859]" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}