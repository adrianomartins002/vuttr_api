import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToMany } from 'typeorm';
import Tools from './Tools';

/**
 * Type orm faz a inicialização das variáveis
 */

@Entity('tags')
class Tags {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => Tools)
  @JoinColumn()
  tools: Tools[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tags;
