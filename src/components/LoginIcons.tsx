import AppleSVG from "@/assets/icons/apple.svg";
import GithubSVG from "@/assets/icons/github.svg";
import GoogleSVG from "@/assets/icons/google.svg";

export const Icons = {
  apple: AppleSVG,
  github: GithubSVG,
  google: GoogleSVG,
} as const;

interface LoginIconProps {
  className?: string;
  icon: "apple" | "github" | "google";
}

export const LoginIcon = ({ className, icon }: LoginIconProps) => {
  const IconComponent = Icons[icon];
  return <IconComponent className={className} />;
};
