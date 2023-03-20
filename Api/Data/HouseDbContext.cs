using Microsoft.EntityFrameworkCore;

public class HouseDbContext : DbContext
{
    public HouseDbContext(DbContextOptions<HouseDbContext> options) : base(options) { }
    public DbSet<HouseEntity> Houses => Set<HouseEntity>();
    public DbSet<BidEntity> Bids => Set<BidEntity>();

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        Console.WriteLine(path);
        options.UseSqlite($"Data Source={Path.Join(path, "houses2.db")}");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        SeedData.Seed(modelBuilder);
    }
}
