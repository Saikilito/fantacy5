export const selectOptions = {
  menu: (provided: any) => ({
    ...provided,
    width: '100%',
    borderBottom: '1px dotted pink',
    color: 'red',
    padding: 20,
  }),

  control: _ => ({
    width: '100%',
  }),

  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'

    return { ...provided, opacity, transition }
  },
}
