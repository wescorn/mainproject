namespace Orders.Infrastructure
{
    public interface IServiceGateway<T>
    {
        T Get(int id);
    }
}
