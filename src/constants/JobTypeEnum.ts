export interface JobTypeInterface {
  id: number,
  name: string,
  color: string
}
export const JobTypeEnum: JobTypeInterface[] = [
  {
    id: 1,
    name: "春招",
    color: 'green'
  },
  {
    id: 2,
    name: "秋招",
    color: 'volcano'
  },
  {
    id: 3,
    name: "暑期实习",
    color: 'red'
  },
  {
    id: 4,
    name: "实习",
    color: 'cyan'
  },
  {
    id: 5,
    name: "兼职",
    color: 'pink'
  },
  {
    id: 6,
    name: "全职",
    color: 'blue'
  },
]
