export interface ICart {
  isModalVisible: boolean;
  onCancel: () => void;
}

export interface FormModalProps {
  visible: boolean;
  onCancel: () => void;
}

export interface IRoute {
  path: string;
  component: React.ComponentType;
}
