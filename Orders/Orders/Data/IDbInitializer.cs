namespace Orders.Data
{
    public interface IDbInitializer
    {
        void Initialize(OrdersContext context);
    }
}
