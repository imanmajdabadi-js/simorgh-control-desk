import type { Category, City, Priority, Status } from '../types';

export type Options = Category | Priority | City | Status;

interface DropDownItem {
  id: string;
  title: string;
  selectedValue: string;
  options: Options[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface DropDownProps {
  dropDown: DropDownItem[];
}

const DropDown = ({ dropDown }: DropDownProps) => {
  return (
    <div>
      {dropDown.map((item) => {
        return (
          <div key={item.id} className="flex flex-col py-2">
            <label htmlFor={item.id}>{item.title}</label>

            <select
              id={item.id}
              name={item.id}
              value={item.selectedValue}
              onChange={item.onChange}
              className="border rounded-md w-52"
            >
              <option className="text-sm" value="">
                All
              </option>

              {item.options.map((option) => (
                <option className="text-sm" key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default DropDown;
