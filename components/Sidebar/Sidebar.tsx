import styles from './Sidebar.module.css';
import BuildingBlockMenu from './buildingBlocks/BuildingBlockMenu';
// import { EuiFieldSearch, EuiHorizontalRule } from '@elastic/eui';
import { EuiHorizontalRule } from '@elastic/eui';
// import { useState } from 'react';

export default function Sidebar() {
    // const [value, setValue] = useState('');

    // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setValue(e.target.value);
    // };

    return (
        <div className={styles.container}>
            <EuiHorizontalRule />
            <div className={styles.buildingBlocksContainer}>
                <BuildingBlockMenu type="agent" />
                <BuildingBlockMenu type="hub" />
                <BuildingBlockMenu type="task" />
                <BuildingBlockMenu type="event" />
                <BuildingBlockMenu type="object" />
                <EuiHorizontalRule />
                {/* <EuiFieldSearch
                    placeholder="Search"
                    onChange={onChange}
                    value={value}
                    aria-label="Use aria labels when no actual label is in use"
                /> */}
                <EuiHorizontalRule />
            </div>
        </div>
    );
}
