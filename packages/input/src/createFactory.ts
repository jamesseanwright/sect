import Input, { SupportedInput } from './Input';
import InputInteractable from './InputInteractable';

const createFactory = <T extends InputInteractable<SupportedInput>>(
    Comp: new (input: SupportedInput) => InputInteractable<SupportedInput>,
    input: SupportedInput,
) => () => new Comp(input) as T;

export default createFactory;
