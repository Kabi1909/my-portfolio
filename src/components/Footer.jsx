import { profile } from "../config/profile";
import { SocialLinks } from "./Shared";
export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <a className="logo" href="#home">
          {profile.logo}.
        </a>
        <p>
          {profile.fullName} <span> / </span> {profile.title}
        </p>
      </div>
      <p>
        © {new Date().getFullYear()} · Designed & Developed by{" "}
        {profile.fullName}
      </p>
      <div className="social-icons">
        <SocialLinks />
      </div>
    </footer>
  );
}
