export default function Table({ columns, data }) {
  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="rounded-2xl text-left capitalize bg-blue-100 mb-2">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={col.key}
                  className={`p-4 ${
                    i === 0
                      ? "rounded-l-xl"
                      : i === columns.length - 1
                      ? "rounded-r-xl"
                      : ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item.id || idx} className="text-foreground">
                {columns.map((col) => (
                  <td key={col.key} className="p-4 capitalize">
                    {col.render
                      ? col.render(item[col.key], item)
                      : item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
