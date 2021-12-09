import { useForm } from "react-hook-form";

import { FORM_STYLE } from "../../styles";
import { required } from "../auth/constants";
import { Container, FormError } from "../customElements";
import { useUserContext } from "../UserContext";
import { AddFormValues, SelectedCoin } from "./types";

type AddProps = {
  coin: {
    id: string,
    name: string
  },
  setCoin: React.Dispatch<React.SetStateAction<SelectedCoin | undefined>>
}

export const Add = ({ coin: { id, name }, setCoin }: AddProps) => {
  const { userId } = useUserContext();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<AddFormValues>();

  const onSubmit = (values: AddFormValues) => {
    
    fetch('/api/crypto/add', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...values, userId })
    }).then(r => r.json()).then(() => {
      setCoin(undefined);
      reset()
    })
  };
  
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} style={FORM_STYLE}>
        <h3 style={{ marginTop: 0 }}>
          {`Add ${name}`}
        </h3>
        <input type="hidden" value={id} {...register('cryptoId')} />
        <input
          placeholder="alias"
          type="text"
          {...register('alias', { required })}
        />
        <FormError error={errors.alias?.message} />
        <input
          placeholder="tags"
          type="text"
          {...register('tags', { required })}
        />
        <FormError error={errors.tags?.message} />
        <input
          placeholder="target price"
          type="number"
          {...register('targetPrice', { required })}
        />
        <FormError error={errors.targetPrice?.message} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type='submit'>
            Add
          </button>
          <button onClick={() => setCoin(undefined)}>
            Cancel
          </button>
        </div>
      </form>
    </Container>
  );
}