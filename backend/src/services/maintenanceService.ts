import { MaintenanceRepository } from "../repositories/maintenanceRepository";
import { BadRequestError, NotFoundError } from "../helpers/api-erros";
import { MaintenanceCompanyRepository } from "../repositories/MaintenanceCompanyRepository";

export class MaintenanceService {
  async createMaintenance(companyId: string, maintenanceData: any) {
    const maintenanceCompany = await MaintenanceCompanyRepository.findOne({
      where: { id_empresa_manutencao: maintenanceData.id_empresa_manutencao },
    });
  
    if (!maintenanceCompany) {
      throw new BadRequestError("Empresa não encontrada");
    }
  
    const newMaintenance = MaintenanceRepository.create({
      ...maintenanceData,
      maintenanceCompany,
    });
  
    await MaintenanceRepository.save(newMaintenance);
  }
  
  

  async getAllMaintenances() {
    const maintenances = await MaintenanceRepository.createQueryBuilder(
      "manutencao"
    )
      .leftJoinAndSelect("manutencao.maintenanceCompany", "maintenanceCompany")
      .select([
        "manutencao.id_manutencao",
        "manutencao.descricao_servico",
        "manutencao.data_manutencao",
        "maintenanceCompany.nome_empresa",
      ])
      .getMany();
  
    return maintenances;
  }

  async getMaintenanceById(id_manutencao: string) {
    const maintenance = await MaintenanceRepository.findOne({
      where: { id_manutencao },
    });

    if (!maintenance) {
      throw new NotFoundError("Manutenção não encontrada.");
    }

    return maintenance;
  }

  async updateMaintenanceById(id_manutencao: string, maintenanceData: any) {
    const maintenance = await MaintenanceRepository.findOne({
      where: { id_manutencao },
      relations: ["maintenanceCompany"],
    });
  
    if (!maintenance) {
      throw new NotFoundError("Manutenção não encontrada.");
    }
  
    const maintenanceCompany = await MaintenanceCompanyRepository.findOne({
      where: { id_empresa_manutencao: maintenanceData.id_empresa_manutencao },
    });
  
    if (!maintenanceCompany) {
      throw new BadRequestError("Empresa não encontrada");
    }
  
    maintenance.descricao_servico = maintenanceData.descricao_servico;
    maintenance.data_manutencao = maintenanceData.data_manutencao;
    maintenance.maintenanceCompany = maintenanceCompany;
  
    await MaintenanceRepository.save(maintenance);
  }
  

  async deleteMaintenance(id_manutencao: string) {
    const maintenance = await MaintenanceRepository.findOne({
      where: { id_manutencao },
    });

    if (!maintenance) {
      throw new NotFoundError("Manutenção não encontrada.");
    }

    await MaintenanceRepository.delete(maintenance);
  }
}
