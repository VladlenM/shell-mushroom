import type { FormEvent } from 'react';
import type { CheckoutRequest } from '@shop/contracts';
import type { SubmitStatus } from '../place-order';
import styles from './CheckoutForm.module.css';

interface CheckoutFormProps {
  status: SubmitStatus;
  onSubmit: (details: CheckoutRequest) => void;
}

export function CheckoutForm({ status, onSubmit }: CheckoutFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit({ name: String(data.get('name')), email: String(data.get('email')) });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field}>
        <span>Full name</span>
        <input name="name" autoComplete="name" required />
      </label>
      <label className={styles.field}>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      {status === 'failed' && <p className={styles.error}>Something went wrong. Please try again.</p>}
      <button type="submit" className={styles.submit} disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Placing order…' : 'Place order'}
      </button>
    </form>
  );
}
