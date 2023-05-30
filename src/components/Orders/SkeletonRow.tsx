const SkeletonRow: React.FC = () => (
  <tr>
    {[...Array(6)].map((_, index) => (
      <td key={index} className='animate-pulse'>
        <div className="flex items-center space-x-4">
          <div className="w-full h-10 bg-slate-500 rounded">
            <div className="h-6 bg-slate-700 rounded m-2"></div>
          </div>
        </div>
      </td>
    ))}
  </tr>
);

export default SkeletonRow;
