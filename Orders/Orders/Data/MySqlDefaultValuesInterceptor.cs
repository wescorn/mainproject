namespace Orders.Data
{
    using Microsoft.EntityFrameworkCore.Diagnostics;
    using System.Data.Common;

    public class MySqlDefaultValuesInterceptor : DbCommandInterceptor
    {
        public override InterceptionResult<DbDataReader> ReaderExecuting(DbCommand command, CommandEventData eventData, InterceptionResult<DbDataReader> result)
        {
            if (command.CommandText.Contains("DEFAULT VALUES()"))
            {
                command.CommandText = command.CommandText.Replace("DEFAULT VALUES()", "VALUES()");
            }

            return result;
        }
    }
}
