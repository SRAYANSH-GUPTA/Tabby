interface IAccordionTheme {
  backgroundColor: string;
  borderColor: string;
  headlineColor: string;
  subtitleColor: string;
  iconColor: string;
}

type TAccordionIcons = "chevron" | "cross";
type TAccordionType = "single" | "multiple";

interface IAccordionContext {
  openItems: Set<string>;
  toggleItem: (id: string) => void;
  theme: IAccordionTheme;
  spacing: number;
}

interface IAccordionProps {
  children: React.ReactNode;
  type?: TAccordionType;
  theme?: IAccordionTheme;
  spacing?: number;
}

interface IAccordionItemProps {
  children: React.ReactNode;
  value: string;
  pop?: boolean;
  icon?: TAccordionIcons;
  popScale?: number;
  isLast?: boolean;
}

interface IAccordionTriggerProps {
  children: React.ReactNode;
}

interface IAccordionContentProps {
  children: React.ReactNode;
}

export type {
  IAccordionContentProps,
  IAccordionContext,
  TAccordionIcons,
  IAccordionItemProps,
  IAccordionProps,
  IAccordionTheme,
  IAccordionTriggerProps,
  TAccordionType,
};
