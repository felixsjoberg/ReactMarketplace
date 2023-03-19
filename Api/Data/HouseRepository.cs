using Microsoft.EntityFrameworkCore;

public interface IHouseRepository
{
    Task<List<HouseDto>> GetAll();
    Task<HouseDetailDto?> Get(int id);
    Task<HouseDetailDto> Add(HouseDetailDto house);
    Task<HouseDetailDto> Update(HouseDetailDto house);
    Task Delete(int id);

}

public class HouseRepository : IHouseRepository
{
    private readonly HouseDbContext _context;
    private static HouseDetailDto EntityToDetailDto(HouseEntity e)
    {
        return new HouseDetailDto(e.Id, e.Address, e.Country, e.Description, e.Price, e.Photo);
    }

    private static void DtoToEntity(HouseDetailDto dto, HouseEntity e)
    {
        e.Address = dto.Address;
        e.Country = dto.Country;
        e.Description = dto.Description;
        e.Price = dto.Price;
        e.Photo = dto.Photo;
    }
    public HouseRepository(HouseDbContext context)
    {
        _context = context;
    }

    public async Task<List<HouseDto>> GetAll()
    {
        return await _context.Houses
            .Select(h => new HouseDto(h.Id, h.Address, h.Country, h.Price))
            .ToListAsync();
    }
    public async Task<HouseDetailDto?> Get(int id)
    {
        var entity = await _context.Houses.SingleOrDefaultAsync(h => h.Id == id);
        if (entity == null)
            return null;
        return new HouseDetailDto(entity.Id, entity.Address, entity.Country, entity.Description, entity.Price, entity.Photo);
    }


    public async Task<HouseDetailDto> Add(HouseDetailDto dto)
    {
        var entity = new HouseEntity();
        DtoToEntity(dto, entity);
        _context.Houses.Add(entity);
        await _context.SaveChangesAsync();
        return EntityToDetailDto(entity);
    }

    public async Task<HouseDetailDto> Update(HouseDetailDto dto)
    {
        var entity = await _context.Houses.FindAsync(dto.Id);
        if (entity == null)
            throw new ArgumentException($"Trying to update house: entity with ID {dto.Id} not found.");
        DtoToEntity(dto, entity);
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return EntityToDetailDto(entity);
    }

    public async Task Delete(int id)
    {
        var entity = await _context.Houses.FindAsync(id);
        if (entity == null)
            throw new ArgumentException($"Trying to delete house: entity with ID {id} not found.");
        _context.Houses.Remove(entity);
        await _context.SaveChangesAsync();
    }
}