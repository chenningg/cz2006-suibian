import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model
} from "sequelize-typescript";

@Table
export class Room extends Model<Room> {
  @Column
  roomcode!: string;

  @Column
  roomstatus!: string;

  @Column
  numberparticipants!: number;

  @Column
  roomcreationtime!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
