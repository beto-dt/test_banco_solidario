using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Data;

namespace api_banco_solidario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : Controller
    {
        private IConfiguration _configuration;

        public AccountsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("GetAccounts")]

        public JsonResult GetAccounts()
        {
            string query = "select * from accounts";
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
        [Route("GetAccount")]

        public dynamic GetAccount([FromBody] Object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());
            string id = data.id.ToString();
            string query = "select * from accounts where id_account=@id";
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
                            message = "Account Found Successfully",
                            result = table
                        };
                    }
                    else
                    {
                        return new
                        {
                            success = false,
                            message = "Account not found",
                        };

                    }
                }
            }
        }

        [HttpPut]
        [Route("UpdateAccount")]

        public dynamic UpdateAccount([FromBody] Object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());
            string id = data.id.ToString();
            string total = data.total.ToString();
            string query = "update accounts set total = @total  where id_account=@id";
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
        [Route("AddAccount")]

        public dynamic AddAccount([FromBody] Object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());
            string newIdUser = data.id_user.ToString();
            string newTotal = data.total.ToString();
            string newDescription = data.description.ToString();
            string newIdRateType = data.id_rateType.ToString();
            string newCreated = data.created.ToString();
            string query = "insert into accounts values (@newIdUser, @newTotal,@newDescription, @newIdRateType, @newCreated)";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@newIdUser", newIdUser);
                    myCommand.Parameters.AddWithValue("@newTotal", newTotal);
                    myCommand.Parameters.AddWithValue("@newDescription", newDescription);
                    myCommand.Parameters.AddWithValue("@newIdRateType", newIdRateType);
                    myCommand.Parameters.AddWithValue("@newCreated", newCreated);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                    return new
                    {
                        success = true,
                        message = "Account Created",
                    };
                }
            }
        }

        [HttpDelete]
        [Route("DeleteAccount")]

        public dynamic DeleteAccount([FromBody] Object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());
            string id = data.id.ToString();
            string query = "delete from accounts where id_account=@id";
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
                }
            }
            return new
            {
                success = true,
                message = "Account Deleted",
            };
        }
    }
}
