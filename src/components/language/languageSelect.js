import React from "react";
//components
import i18next from "i18next";
//dependencies
import { useTranslation } from "react-i18next";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";

//images
import En from "../../assets/images/english.png";
// import Ru from "../../assets/images/russia.jpg";
import He from "../../assets/images/israel.png";
// import Ar from "../../assets/images/arabian.png";

const LanguageSelect = () => {
  const languageMap = {
    en: { label: "English", dir: "ltr", active: true, img: En },
    he: { label: "עברית", dir: "rtl", active: false, img: He },
  };
  const selected = localStorage.getItem("i18nextLng") || "en";
  const { t } = useTranslation();
  const [menuAnchor, setMenuAnchor] = React.useState(null);

  React.useEffect(() => {
    document.body.dir = languageMap[selected]?.dir;
  }, [menuAnchor, selected]); //eslint-disable-line

  return (
    <div className="d-flex justify-content-end align-items-center language-select-root">
      <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}>
        {selected === "en-US"
          ? languageMap["en"]?.label
          : languageMap[selected]?.label.slice(0, 2)}
        <ArrowDropDown fontSize="small" />
      </Button>
      <Popover
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div>
          <List>
            <ListSubheader style={{ fontFamily: "inherit" }}>
              {t("Select Language")}
            </ListSubheader>
            {Object.keys(languageMap)?.map((item) => (
              <ListItem
                button
                key={item}
                onClick={() => {
                  i18next.changeLanguage(item);
                  setMenuAnchor(null);
                }}
              >
                <img
                  src={languageMap[item].img}
                  alt=""
                  height={20}
                  width={20}
                />
                {languageMap[item].label}
              </ListItem>
            ))}
          </List>
        </div>
      </Popover>
    </div>
  );
};

export default LanguageSelect;
