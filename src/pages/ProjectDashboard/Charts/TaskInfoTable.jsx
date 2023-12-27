import { useState } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Group, Avatar, Text, rem, TextInput, Center, UnstyledButton, Badge } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector } from '@tabler/icons-react';
import { keys } from '@mantine/utils';

// const data = [
//     {
//         "id": "1",
//         "avatar": "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
//         "name": "Robert Wolfkisser",
//         "job": "Engineer",
//         "email": "rob_wolf@gmail.com"
//     },
//     {
//         "id": "2",
//         "avatar": "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
//         "name": "Jill Jailbreaker",
//         "job": "Engineer",
//         "email": "jj@breaker.com"
//     },
//     {
//         "id": "3",
//         "avatar": "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
//         "name": "Henry Silkeater",
//         "job": "Designer",
//         "email": "henry@silkeater.io"
//     },
//     {
//         "id": "4",
//         "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
//         "name": "Bill Horsefighter",
//         "job": "Designer",
//         "email": "bhorsefighter@gmail.com"
//     },
//     {
//         "id": "5",
//         "avatar": "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
//         "name": "Jeremy Footviewer",
//         "job": "Manager",
//         "email": "jeremy@foot.dev"
//     }
// ]


const useStyles = createStyles((theme) => ({
    rowSelected: {
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
                : theme.colors[theme.primaryColor][0],
    },
    th: {
        padding: '0 !important',
    },

    control: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    icon: {
        width: rem(21),
        height: rem(21),
        borderRadius: rem(21),
    },
}));


function filterData(data, search) {
    const query = search.toLowerCase().trim();
    return data.filter((item) => {
        return keys(data[0]).some((key) => {
            if (key == 'userName' || key == 'email') {
                console.log(key);
                return item[key].toLowerCase().includes(query);
            }
            else {
                return false;
            }
        }
        )

    }
    );
}

function sortData(
    data,
    payload
) {
    const { sortBy } = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return b[sortBy].localeCompare(a[sortBy]);
            }

            return a[sortBy].localeCompare(b[sortBy]);
        }),
        payload.search
    );
}
const jobColors = {
    engineer: 'blue',
    manager: 'cyan',
    designer: 'pink',
};


function Th({ children, reversed, sorted, onSort }) {
    const { classes } = useStyles();
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group position="apart">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon size="0.9rem" stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </th>
    );
}


const UserInfoTable = ({ data }) => {

    console.log(data);

    const { classes, cx } = useStyles();
    const [selection, setSelection] = useState(['1']);
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (field) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, { sortBy: field, reversed, search }));
    };

    const toggleRow = (_id) =>
        setSelection((current) =>
            current.includes(_id) ? current.filter((item) => item !== _id) : [...current, _id]
        );
    const toggleAll = () =>
        setSelection((current) => (current.length === data.length ? [] : data.map((item) => item._id)));

    const handleSearchChange = (event) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const rows = sortedData.map((item, index) => {
        const selected = selection.includes(item._id);
        return (
            <tr key={item._id} className={cx({ [classes.rowSelected]: selected })}>
                <td>
                    <Checkbox
                        checked={selection.includes(item._id)}
                        onChange={() => toggleRow(item._id)}
                        transitionDuration={0}
                    />
                </td>
                <td>
                    <Group spacing="sm">
                        <Avatar size={26} src={item.avatar} radius={26} />
                        <Text size="sm" weight={500}>
                            {item.userName}
                        </Text>
                    </Group>
                </td>
                <td>{item.email}</td>
                {/* <td><Badge
                    color={jobColors[item.job.toLowerCase()]}
                    variant={'outline'}
                >
                    {item.job}
                </Badge></td> */}
            </tr>
        );
    });

    return (
        <ScrollArea>
            <TextInput
                placeholder="Search by any field"
                mb="md"
                icon={<IconSearch size="0.9rem" stroke={1.5} />}
                value={search}
                onChange={handleSearchChange}
            />
            <Table miw={800} verticalSpacing="sm">
                <thead>
                    <tr>
                        <th style={{ width: rem(40) }}>
                            <Checkbox
                                onChange={toggleAll}
                                checked={selection.length === data.length}
                                indeterminate={selection.length > 0 && selection.length !== data.length}
                                transitionDuration={0}
                            />
                        </th>
                        <Th
                            sorted={sortBy === 'userName'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('userName')}
                        >
                            UserName
                        </Th>
                        <Th
                            sorted={sortBy === 'email'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('email')}
                        >
                            Email
                        </Th>
                        {/* <Th
                            sorted={sortBy === 'job'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('job')}
                        >
                            Job
                        </Th> */}
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <tr>
                            <td colSpan={Object.keys(data[0]).length}>
                                <Text weight={500} align="center">
                                    Nothing found
                                </Text>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </ScrollArea>
    );
}


export default UserInfoTable;