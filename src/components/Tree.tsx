// Tree.tsx
import { IRepositoryTreeNode } from 'src/interfaces/repository/repository-node-interface';
import TreeNode from './TreeNode';

export default function Tree({ data }: { data: IRepositoryTreeNode[] }) {
  return (
    <nav className="menu">
      <ul className="flex flex-col mt-8 xl:mt-12">
        {data.map((node, i) => (
          <>
            <TreeNode key={i} node={node} level={0} />
            {i < data.length - 1 && (
              <div className="w-full border-b-2 border-[#D5D5D5] dark:border-[#181E26] opacity-100 my-[32px] md:my-[40px]"></div>
            )}
          </>
        ))}
      </ul>
    </nav>
  );
}
