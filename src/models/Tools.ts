import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import Tags from './Tags';
/**
 * Type orm faz a inicialização das variáveis
 */

@Entity('tools')
class Tools {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column()
  description: string;

  @ManyToMany(type => Tags, tags => tags.tools, { cascade: true, onDelete: "CASCADE" })
  @JoinTable()
  tags: Tags[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tools;
