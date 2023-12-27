import React from 'react';
import { createStyles, Group, Paper, Text, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';


const useStyles = createStyles((theme) => ({
    root: {
        padding: `calc(${theme.spacing.xl} * 1.5)`,
    },

    label: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));

// const data = [
//     {
//         "title": "Revenue",
//         "value": "$13,456",
//         "diff": 34
//     },
//     {
//         "title": "Profit",
//         "value": "$4,145",
//         "diff": -13
//     },
//     {
//         "title": "Coupons usage",
//         "value": "745",
//         "diff": 18
//     }
// ]

const StatsChart = ({ basicData }) => {
    const { classes } = useStyles();

    const data = []
    const basicDataKeys = Object.keys(basicData)
    const basicDataValues = Object.values(basicData)

    for (let i = 0; i < basicDataKeys.length; i++) {
        data.push({
            "title": basicDataKeys[i],
            "value": basicDataValues[i],
            "diff": 34
        })
    }




    const stats = data.map((stat) => {
        const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

        return (
            <Paper withBorder p="md" radius="md" key={stat.title} w={'100%'}>
                <Group position="apart">
                    <div>
                        <Text c="dimmed" tt="uppercase" fw={700} fz="xs" className={classes.label}>
                            {stat.title}
                        </Text>
                        <Text fw={700} fz="xl">
                            {stat.value}
                        </Text>
                    </div>
                    <ThemeIcon
                        color="gray"
                        variant="light"
                        sx={(theme) => ({ color: stat.diff > 0 ? theme.colors.teal[6] : theme.colors.red[6] })}
                        size={38}
                        radius="md"
                    >
                        <DiffIcon size="1.8rem" stroke={1.5} />
                    </ThemeIcon>
                </Group>
                <Text c="dimmed" fz="sm" mt="md">
                    <Text component="span" c={stat.diff > 0 ? 'teal' : 'red'} fw={700}>
                        {stat.diff}%
                    </Text>{' '}
                    {stat.diff > 0 ? 'increase' : 'decrease'} compared to last month
                </Text>
            </Paper>
        );
    });

    return (
        <div className={classes.root}>
            <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                {stats}
            </SimpleGrid>
        </div>
    );
}

export default StatsChart;