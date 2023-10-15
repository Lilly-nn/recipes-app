import { MdOutlineLanguage } from "react-icons/md";
import i18next from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const langs = ["en", "ua", "ru"];

export default function SwitchLang() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const { t } = useTranslation();

  function changeLanguage(lang: string) {
    i18next.changeLanguage(lang);
    setIsVisible(false);
    setCurrentLang(lang);
  }

  useEffect(() => {
    document.title = t("app_title");
  }, [currentLang, t]);
  return (
    <>
      <MdOutlineLanguage
        onClick={() => setIsVisible(!isVisible)}
        className="absolute right-[50px] text-3xl text-blue-300 cursor-pointer"
      />
      {isVisible && (
        <div className="bg-gray-200 w-fit flex gap-x-2 text-center rounded-md top-16 p-2 absolute right-[50px]">
          {langs.map((lang) => (
            <button
              onClick={() => changeLanguage(lang)}
              key={lang}
              className="hover:underline  text-gray-500"
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
