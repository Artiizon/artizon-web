import { useField, ErrorMessage } from "formik";

function Input({ placeholder, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-600 text-sm font-semibold">{field.name}</label>
      <input
        type={field.type}
        name={field.name} 
        placeholder={placeholder}
        {...field}
        {...props}
        className={`border-2 ${meta.touched && meta.error && "border-red-600"}  border-gray-300 p-2 rounded-md`}
      />
      <p className="text-red-700 text-ms font-bold">
        {meta.touched && meta.error &&  <ErrorMessage name={field.name} />}
        
      </p>
    </div>
  );
}

export default Input;
