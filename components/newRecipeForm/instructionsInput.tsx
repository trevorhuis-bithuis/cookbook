
type InstructionsInputProps = {
    instructions: string[];
    setInstructions: (instructions: string[]) => void;
}

export default function InstructionsInput(props: InstructionsInputProps) {
    const { instructions, setInstructions } = props;

    function addInstruction() {
        setInstructions([...instructions, ''])
    }

    function updateInstruction(index: number, value: string) {
        const newInstructions = [...instructions]
        newInstructions[index] = value
        setInstructions(newInstructions)
    }


    function removeInstruction(index: number) {
        return () => {
            const newInstructions = [...instructions]
            newInstructions.splice(index, 1)
            setInstructions(newInstructions)
        }
    }

    return (
        <div className="sm:col-span-6 ">
            <p className="block text-md font-medium text-gray-700 mb-4">
                Instructions
            </p>
            {instructions.map((instruction, index) => {
                return (
                    <div className="my-2" key={index}>
                        <label htmlFor="instruction" className="block text-sm font-medium text-gray-500">
                            Step {index + 1}
                        </label>
                        <div className="flex">
                            <div className="flex-1">
                                <textarea
                                    id="instruction"
                                    name="instruction"
                                    rows={2}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    defaultValue={''}
                                    value={instruction}
                                    onChange={(e) => { updateInstruction(index, e.target.value) }}
                                />
                            </div>
                            <div className="flex-none content-center">
                                <button className="m-2" type="button" onClick={removeInstruction(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            )}
            <button className="m-2" type="button" onClick={addInstruction}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 border-2 border-indigo-700 rounded-md">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </div>
    )
}