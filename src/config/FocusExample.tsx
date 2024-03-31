import { useFocus, Box, Text, useFocusManager, useInput } from 'ink';
import React from 'react';

// export function Focus() {
//     return (
//         <Box flexDirection="column" padding={1}>
//             <Box marginBottom={1}>
//                 <Text>
//                     Press Tab to focus next element, Shift+Tab to focus previous element,
//                     Esc to reset focus.
//                 </Text>
//             </Box>
//             <Item label="First" />
//             <Item label="Second" />
//             <Item label="Third" />
//         </Box>
//     );
// }

// function Item({ label }: { label: string }) {
//     const { isFocused } = useFocus();
//     return (
//         <Text>
//             {label} {isFocused && <Text color="green">(focused)</Text>}
//         </Text>
//     );
// }

export function Focus() {
    const { focus } = useFocusManager();

    useInput(input => {
        if (input === '1') {
            focus('1');
        }

        if (input === '2') {
            focus('2');
        }

        if (input === '3') {
            focus('3');
        }
    });

    return (
        <Box flexDirection="column" padding={1}>
            <Box marginBottom={1}>
                <Text>
                    Press Tab to focus next element, Shift+Tab to focus previous element,
                    Esc to reset focus.
                </Text>
            </Box>
            <Item id="1" label="Press 1 to focus" />
            <Item id="2" label="Press 2 to focus" />
            <Item id="3" label="Press 3 to focus" />
        </Box>
    );
}

type ItemProps = {
    readonly id: number;
    readonly label: string;
};

function Item({ label, id }: ItemProps) {
    const { isFocused } = useFocus({ id });

    return (
        <Text>
            {label} {isFocused && <Text color="green">(focused)</Text>}
        </Text>
    );
}
