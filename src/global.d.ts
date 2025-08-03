declare module "react-icons/vsc" {
  interface IconProps {
    className?: string;
    size?: string | number;
    color?: string;
  }

  // ActivityBar icons
  export const VscFiles: React.ComponentType<IconProps>;
  export const VscSearch: React.ComponentType<IconProps>;
  export const VscSourceControl: React.ComponentType<IconProps>;
  export const VscExtensions: React.ComponentType<IconProps>;
  export const VscSettingsGear: React.ComponentType<IconProps>;

  // Sidebar icons
  export const VscFolder: React.ComponentType<IconProps>;
  export const VscFolderOpened: React.ComponentType<IconProps>;
  export const VscFile: React.ComponentType<IconProps>;
  export const VscFileCode: React.ComponentType<IconProps>;
  export const VscJson: React.ComponentType<IconProps>;
  export const VscMarkdown: React.ComponentType<IconProps>;

  // Extensions Panel icons
  export const VscRefresh: React.ComponentType<IconProps>;
  export const VscCloudDownload: React.ComponentType<IconProps>;
  export const VscCheck: React.ComponentType<IconProps>;

  // Source Control Panel icons
  export const VscGitCommit: React.ComponentType<IconProps>;
  export const VscAccount: React.ComponentType<IconProps>;
  export const VscRepo: React.ComponentType<IconProps>;

  // Search Panel icons
  export const VscReplace: React.ComponentType<IconProps>;
  export const VscCaseSensitive: React.ComponentType<IconProps>;
  export const VscWholeWord: React.ComponentType<IconProps>;
  export const VscRegex: React.ComponentType<IconProps>;
  export const VscChevronDown: React.ComponentType<IconProps>;
  export const VscChevronRight: React.ComponentType<IconProps>;
}
