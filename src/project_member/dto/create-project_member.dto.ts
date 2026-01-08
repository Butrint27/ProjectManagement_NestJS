import { ProjectRole } from "../entities/project_member.entity";

export class CreateProjectMemberDto {
  projectId: number; // FK to Project
  userId: number;    // FK to User
  role?: ProjectRole; // optional, default: VIEWER
}

