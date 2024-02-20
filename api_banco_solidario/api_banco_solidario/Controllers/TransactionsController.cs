using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Identity.Client;
using Newtonsoft.Json;
using System.Data;

namespace api_banco_solidario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : Controller
    {
        private IConfiguration _configuration;

        public TransactionsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("GetTransactions")]

        public JsonResult GetTransactions()
        {
            string query = "select * from transactions";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpGet]
        [Route("GetTransaction")]

        public dynamic GetTransaction([FromBody] Object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());
            string id = data.id.ToString();
            string query = "select * from transactions where id_transaction=@id";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                    if (table.Rows.Count > 0)
                    {
                        return new
                        {
                            success = true,
                            message = "Transaction Found Successfully",
                            result = table
                        };
                    }
                    else
                    {
                        return new
                        {
                            success = false,
                            message = "Transaction not found",
                        };

                    }
                }
            }
        }

        [HttpPut]
        [Route("UpdateTransaction")]

        public dynamic UpdateTransaction([FromBody] Object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());
            string id = data.id.ToString();
            string total = data.total.ToString();
            string query = "update transactions set total = @total  where id_transaction=@id";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@total", total);
                    myCommand.Parameters.AddWithValue("@id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                    return new
                    {
                        success = false,
                        message = "Updated Successfully"
                    };
                }
            }
        }

        [HttpPost]
        [Route("AddTransaction")]

        public dynamic AddAccount([FromBody] Object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());
            string newIdAccount = data.id_account.ToString();
            string newtype = data.type.ToString();
            string newTotal = data.total.ToString();
            string newCreated = data.created.ToString();
            string query = "insert into transactions values (@newIdAccount, @newtype,@newTotal, @newCreated)";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@newIdAccount", newIdAccount);
                    myCommand.Parameters.AddWithValue("@newtype", newtype);
                    myCommand.Parameters.AddWithValue("@newTotal", newTotal);
                    myCommand.Parameters.AddWithValue("@newCreated", newCreated);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                    return new
                    {
                        success = true,
                        message = "Transaction Created",
                    };
                }
            }
        }

        [HttpDelete]
        [Route("DeleteTransaction")]

        public dynamic DeleteTransaction([FromBody] Object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());
            string id = data.id.ToString();
            string query = "delete from transactions where id_transaction=@id";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                    return new
                    {
                        success = true,
                        message = "Transaction Deleted",
                    };
                }
            }
        }
    }
}
