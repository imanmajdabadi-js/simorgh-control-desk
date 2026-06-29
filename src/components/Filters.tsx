import { useState } from 'react';
import DropDown from './DropDown';

const Filters = () => {
  // const dashoard = useContext(dashboardContext);
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedStatus(value);
  };

  return (
    <div>
      <div>
        <h2 className="border-b w-full p-4">Filter</h2>
        {/* {icon} */}
      </div>
      <DropDown
        dropDown={[
          {
            id: '1',
            onChange: handleChange,
            title: 'Status',
            selectedValue: selectedStatus,
            options: ['open', 'in_progress'],
          },
        ]}
      />
    </div>
  );
};

export default Filters;
