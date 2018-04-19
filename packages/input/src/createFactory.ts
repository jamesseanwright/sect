import Input, { SupportedInput } from './Input';
import InputInteractable from './InputInteractable';

const createFactory = <T extends InputInteractable<SupportedInput>>(
    CompConstructor: new (input: SupportedInput) => InputInteractable<SupportedInput>,
    InputConstructor: new () => SupportedInput,
) => {
    /* This approach results in the input being
     * instantiated lazily, which is required for
     * tests. We should isolate dependencies better
     * going forward.
     */
    let input: SupportedInput;

    return () => {
        if (!input) {
            input = new InputConstructor();
        }

        return new CompConstructor(input) as T;
    };
};

export default createFactory;
