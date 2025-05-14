import styles from './Sidebar.module.css';
import EntityButton from './buildingBlocks/EntityButton';
// import { EuiFieldSearch, EuiHorizontalRule } from '@elastic/eui';
import { EuiHorizontalRule } from '@elastic/eui';
import Image from 'next/image';
// import { useState } from 'react';

export default function Sidebar() {
    // const [value, setValue] = useState('');

    // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setValue(e.target.value);
    // };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Image
                    src={'/nova-luna-logo.svg'}
                    alt={""}
                    width={30}
                    height={30}
                />
                {/* <Image
                    src={'/icons/close-menu.svg'}
                    alt={""}
                    width={30}
                    height={30}
                /> */}
            </div>
            <EuiHorizontalRule />
            <div className={styles.buildingBlocksContainer}>
                <EntityButton entity="hub" />
                <EntityButton entity="task" />
                <EntityButton entity="event" />
                <EuiHorizontalRule />
                <EntityButton entity="agent" />
                <EntityButton entity="object" />
                <EuiHorizontalRule />
                {/* <EuiFieldSearch
                    placeholder="Search"
                    onChange={onChange}
                    value={value}
                    aria-label="Use aria labels when no actual label is in use"
                /> */}
                {/* <EuiHorizontalRule /> */}
            </div>
        </div>
    );
}
