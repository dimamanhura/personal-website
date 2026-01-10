type BaseProps = {
  backPath: string;
  editPath?: string;
};

type ViewOnlyProps = BaseProps & {
  itemId?: never;
  onDelete?: never;
};

type ActionableProps = BaseProps & {
  itemId: string;
  onDelete?: (itemId: string) => Promise<void>;
};

export type ItemOverviewHeaderProps = ViewOnlyProps | ActionableProps;
