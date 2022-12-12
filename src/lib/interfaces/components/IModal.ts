export default interface IModal {
    title?: string;
    active?: boolean;
    value?: any;
    onSuccess?: () => void;
    onClose?: () => void;
    show?: () => void;
}