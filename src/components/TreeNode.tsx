import { useState } from 'preact/hooks';
import { ArrowRight, ArrowDown } from './Arrows';
import { RepositoryNodeType } from '../enums/repository-node-type';
import CalendarIcon from '../components/CalendarIcon';
import SpecialtyArrow from '../components/SpecialtyArrow';
import LinkIcon from '../components/LinkIcon';
import { IRepositoryTreeNode } from 'src/interfaces/repository/repository-node-interface';

interface Props {
  node: IRepositoryTreeNode;
  level?: number;
}

export default function TreeNode({ node, level = 0 }: Props) {
  const [open, setOpen] = useState(false);

  if (node.hidden) return null;

  const isFolder = [
    RepositoryNodeType.FOLDER,
    RepositoryNodeType.ROOT_FOLDER,
    RepositoryNodeType.YEAR_FOLDER,
  ].includes(node.nodeType);

  const hasArrow = [RepositoryNodeType.FOLDER].includes(node.nodeType);

  const isLeaf = node.nodeType === RepositoryNodeType.LEAF;
  const isLink = node.nodeType === RepositoryNodeType.LINK;

  const stylesByLevel = [
    {
      text: 'text-[22px] md:text-[30px]',
      margin: 'ml-2 md:ml-0',
      ul: 'mt-[26px] gap-[16px] md:gap-[20px]',
    },
    {
      text: 'font-jura font-bold text-xl md:text-[26px]',
      margin: 'ml-4 lap:ml-[28px] xl:ml-[57px]',
      ul: 'mt-[14px] md:mt-[20px] ml-[57px] gap-[12px] md:gap-[20px]',
    },
    {
      text: 'font-jura font-bold text-lg md:text-[24px]',
      margin: 'ml-3 lap:ml-[28px]',
      ul: 'mt-[12px] md:mt-[18px] ml-[28px] gap-[14px]',
    },
    {
      text: 'text-lg md:text-[22px]',
      margin: 'ml-2 lap:ml-[16px]',
      ul: 'mt-[12px] md:mt-[18px] ml-[28px] gap-[20px]',
    },
  ];

  const style = stylesByLevel[level] || stylesByLevel[3];

  const handleToggle = () => {
    if (isFolder) setOpen(!open);
  };

  return (
    <li className="mb-0">
      {isFolder && (
        <>
          <button
            className={`flex justify-between items-center w-full hover:text-secondary-300-dark ${style.text} ${style.margin}`}
            onClick={handleToggle}
          >
            <span className="flex items-center gap-2">
              {hasArrow && (
                <SpecialtyArrow className="w-[15px] h-[15px] text-secondary-300-dark dark:text-primary-dark flex-shrink-0" />
              )}
              {node.nodeType === RepositoryNodeType.YEAR_FOLDER && (
                <CalendarIcon className="w-[15px] h-[15px] text-secondary-300-dark dark:text-primary-dark flex-shrink-0" />
              )}
              <span className="flex-1 text-left break-words">{node.title}</span>
            </span>

            <span className="flex-shrink-0 ml-2">
              {node.nodeType === RepositoryNodeType.ROOT_FOLDER &&
                (open ? (
                  <ArrowDown className="w-5 h-5 text-secondary-300-dark dark:text-primary-dark transition-transform" />
                ) : (
                  <ArrowRight className="w-5 h-5 text-secondary-300-dark dark:text-primary-dark transition-transform" />
                ))}
            </span>
          </button>

          {open && node.children && (
            <ul className={`flex flex-col ${style.ul}`}>
              {node.children.map((child, i) => (
                <TreeNode key={i} node={child} level={level + 1} />
              ))}
            </ul>
          )}
        </>
      )}

      {isLink && (
        <a
          target="_blank"
          href={node.link}
          className={`inline-flex items-center gap-2 no-underline hover:text-secondary-300-dark ${style.text} ${style.margin}`}
        >
          <LinkIcon className="w-[15px] h-[15px] text-secondary-300-dark dark:text-primary-dark flex-shrink-0" />
          {node.title}
        </a>
      )}

      {isLeaf && (
        <span
          className={`inline-flex items-center hover:text-secondary-300-dark ${style.text} ${style.margin}`}
        >
          {node.title}
        </span>
      )}
    </li>
  );
}
