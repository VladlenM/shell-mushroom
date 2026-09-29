import styles from './CheckoutButton.module.css';

interface CheckoutButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export function CheckoutButton({ disabled, onClick }: CheckoutButtonProps) {
  return (
    <button type="button" className={styles.button} disabled={disabled} onClick={onClick}>
      Go to checkout
    </button>
  );
}
