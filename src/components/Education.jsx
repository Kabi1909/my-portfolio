import { GraduationCap, MapPin } from "lucide-react";
import { profile } from "../config/profile";
import { SectionHeading } from "./Shared";
export default function Education() {
  return (
    <section id="education" className="section">
      <SectionHeading
        eyebrow="THE FOUNDATION"
        title="Always a student. Always building."
      />
      <div className="education-card">
        <div className="education-icon">
          <GraduationCap size={48} />
        </div>
        <div>
          <p className="eyebrow">EDUCATION</p>
          <h3>{profile.university}</h3>
          <p>Bachelor of Science (Honours) in Information Technology</p>
          <span className="education-location">
            <MapPin size={14} />
            {profile.location}
          </span>
        </div>
        <span className="status-badge">
          <i />
          {profile.status}
        </span>
      </div>
    </section>
  );
}
