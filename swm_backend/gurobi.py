# -*- coding: utf-8 -*-
"""
Created on Fri May 19 11:50:04 2023
@author: kakshat
"""

import sys
import gurobipy as gp
from gurobipy import GRB
import random as rd
import math
import numpy as np
import json, csv
import csv_convert 


def post_proc(colm_location, n, t, x, h, I_0, data_f, c):
    #print("start", colm_location, t)
    
    sltd_=list({(v): h[colm_location,v,0,t] for v in range(I_0[t]) if round(h[colm_location,v,0,t])==1}.keys())
    nodes = []
    routes = []
    rt_labels = []
    cost_route = []
    for u in sltd_:
        cn=[]
        rc=0
        start_rout = [u]
        start_label = [i["node_label"] for i in data_f if int(i["echelon"])==t+1 and int(i["index"])==u+1]
        cn, lb, rc = traverse2(colm_location, u, h, t, I_0, data_f, c)
        nodes.extend(cn)
        
        start_rout.extend(cn)
        start_label.extend(lb)
        
        routes.append(start_rout)
        rt_labels.append(start_label)
        costc = rc + c[colm_location,u,t]
        cost_route.append(costc)
        #print(costc, "routing", colm_location, t)
    sltd_.extend(nodes)
    #print('nodes', sltd_)
    #print('routes ', routes, 'labels', rt_labels, 'cost_routes', cost_route)
    return rt_labels, cost_route


def traverse2(colm_location, u, h, t, I_0, data_f, c):
    colm=[]
    col_label=[]
    rc=0
    vertex=list({(v): h[u,v,0,t] for v in range(I_0[t]+I_0[t+1]) if (v!=u and round(h[u,v,0,t])==1)}.keys())
    if vertex[0]>=I_0[t]:
        rc=rc+c[u,vertex[0],t]
        return colm, col_label, rc
    else:
        rc=rc+c[u,vertex[0],t]
        colm.extend([vertex[0]])
        col_label.extend([i["node_label"] for i in data_f if int(i["echelon"])==t+1 and int(i["index"])==vertex[0]+1]) 
        newn, label, subrc = traverse2(colm_location, vertex[0], h, t, I_0, data_f, c)
        colm.extend(newn)
        col_label.extend(label)
        rc=rc+subrc
        return colm, col_label, rc


def tryCallback(model, where):
    
    try:
        # Found a new (integer) solution to master problem, so use callback
        if where == GRB.Callback.MIP:
            runtime = model.cbGet(GRB.Callback.RUNTIME)
            objbst = model.cbGet(GRB.Callback.MIP_OBJBST)
            objbnd = model.cbGet(GRB.Callback.MIP_OBJBND)
            if round(objbst)!=0:
                gap = abs((objbst - objbnd) / objbst)
            else:
                gap = abs((objbst - objbnd))
            #print("gap: ", gap)

            if gap < 0.05:
                model.terminate()

        
    except KeyboardInterrupt:
        print("Got to terminate except")
        model.terminate()
        
        
#######Input#########################################

def num_unique(list1):
 
    # initialize a null list
    unique_list = []
 
    # traverse for all elements
    for x in list1:
        # check if exists in unique_list or not
        if x not in unique_list:
            unique_list.append(x)
    # print list
    return len(unique_list)-1, unique_list

def MELRP_dim(data_f):
    
    ###Future
    k_0=1 #number of products
    K=[j for j in range(k_0)]
    
    
    ##Check for number of sizes at each echelon after determination of echelons
    
    #Determination of number of echelons
    Fac_levels, Levels=num_unique([i["echelon"] for i in data_f])
    T=[j for j in range(Fac_levels)]
    
    I_0={}
    for i in range(Fac_levels+1):
        I_0[i]=len([j for j in data_f if j["echelon"]==Levels[i]])
    
    h_c={}
    D={}
    V=[]
    M={}
    X_c={}
    n_0=[1]
    for i,e in enumerate(data_f): 
            if int(e["echelon"])==1:
                D[i,0]=float(e["location_cost"])
                
            else:
                h_c[i-sum(I_0[t] for t in range(int(e["echelon"])-1)), int(e["echelon"])-2]=float(e["location_cost"])
                if int(e["index"])==1:
                    fac_cost_str=e["facility_costs"].split(',')
                    print(e["facility_sizes"])
                    fac_size_str=e["facility_sizes"].split(',')
                    
                    if e["vehicle_capacity"]=='':
                        if int(e["echelon"])==2:
                            V.extend([3*max(D[j,0] for j in range(I_0[0]))])
                        else:
                            V.extend([3*max(M[n1,k,int(e["echelon"])-3] for n1 in range(n_0[-2]) for k in K)])
                    else:
                        V.extend([e["vehicle_capacity"]])
                    
                    
                    
                    if len(fac_size_str)==1 and fac_size_str[0]=='':
                        n_0.extend([1])
                        M.update({(n,k,int(e["echelon"])-2): 4.5*V[int(e["echelon"])-2] 
                                  for n in range(n_0[-1]) for k in K})
                        X_c.update({(n,int(e["echelon"])-2): 700+ 600*int(e["echelon"])-2 + 100*(n+1) 
                                  for n in range(n_0[-1])})

                    else:
                        n_0.extend([len(fac_size_str)])
                        for n in range(n_0[-1]):
                            X_c[n,int(e["echelon"])-2]=float(fac_cost_str[n])
                            for k in K:
                                M[n,k,int(e["echelon"])-2]=float(fac_size_str[n])
                                
                    
                    
    
        
    for t in T:
        if t==0:
            comb_g=[(i,t) for i in range(I_0[t+1])]
            comb_N=[(i,n,k,t) for i in range(I_0[t+1]) for n in range(n_0[t+1]) for k in range(k_0)]
            comb_h=[(u,v,k,t) for u in range(I_0[t]+I_0[t+1]) for v in range(I_0[t]+I_0[t+1]) for k in range(k_0) if u!=v]
            
            
        else:
            comb_g.extend((i,t) for i in range(I_0[t+1]))
            comb_N.extend((i,n,k,t) for i in range(I_0[t+1]) for n in range(n_0[t+1]) for k in range(k_0))
            comb_h.extend((u,v,k,t) for u in range(I_0[t]+I_0[t+1]) for v in range(I_0[t]+I_0[t+1]) for k in range(k_0) if u!=v)
        
            
    c={}
    for e in range(Fac_levels):
        c.update(echelon_routecost([j for j in data_f if int(j["echelon"]) in (int(Levels[e]),int(Levels[e])+1)], int(Levels[e])-1))
    
    
       
    return Fac_levels, I_0, comb_h, comb_N, comb_g, D, h_c, c, X_c, V, M, T, K, n_0

def echelon_routecost(data_f, ech):
    c={}
    for i,e in enumerate(data_f):
        for j,f in enumerate(data_f):
            if i==j:
                continue
            else:
                c[i,j,ech]=lat_long(e,f)*(ech+1)*5
    return c

def lat_long(e, f):
    R = 6373.0

    lat1 = math.radians(float(e["lat"]))
    lon1 = math.radians(float(e["lng"]))
    lat2 = math.radians(float(f["lat"]))
    lon2 = math.radians(float(e["lng"]))

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    distance = R * c
    
    return distance
 
def main():
    print("Calling Gurobi from app.py")
    m = gp.Model('Model')
    
    with open('route_data.py') as data_file:
        f = data_file.read()
    
    f=f.replace("'", '"')
    data_k=json.loads(f)
    
    data_f=[]
    for t in range(len(data_k)):
        data_f.extend(data_k[t])    
    
    t_0, I_0, comb_h, comb_N, comb_g, D, h_c, c, X_c, V, M, T, K, n_0=MELRP_dim(data_f)
    
    print(D)
    
    ####################Remove once input is set########################################
    #D={(0, 0): 197, (1, 0): 171, (2, 0): 196, (3, 0): 150, (4, 0): 154, (5, 0): 190, (6, 0): 171, (7, 0): 178, (8, 0): 160, (9, 0): 197, (10, 0): 180, (11, 0): 193, (12, 0): 169, (13, 0): 181, (14, 0): 152, (15, 0): 159, (16, 0): 190, (17, 0): 171, (18, 0): 150, (19, 0): 182}
            
    #h_c={(0, 0): 2534, (1, 0): 2573, (2, 0): 2638, (3, 0): 2800, (4, 0): 2668, (5, 0): 2771, (6, 0): 2631, (7, 0): 2714, (8, 0): 2789, (9, 0): 2779, (0, 1): 3908, (1, 1): 4050, (2, 1): 3940, (3, 1): 4053, (4, 1): 3966}
    ####################################################################################
    
    g = m.addVars(comb_g, vtype=GRB.BINARY, name="Depot location")
    x = m.addVars(comb_N, vtype=GRB.BINARY, name="Depot Capacity")
    h = m.addVars(comb_h, vtype=GRB.BINARY, name="Routing var")
    y = m.addVars(comb_h, vtype=GRB.CONTINUOUS, name="SECs var")
    z = m.addVars(comb_h, vtype=GRB.CONTINUOUS, name="FDCs var")

    #########Constraint (1)##########
    m.addConstrs((gp.quicksum(y[u,c3+I_0[c1],c2,c1] for u in range(I_0[c1]))
                  <= gp.quicksum(M[n,c2,c1]*x[c3,n,c2,c1] for n in range(n_0[c1+1]))
                  for c1 in T for c2 in K for c3 in range(I_0[c1+1])), name='BinCapacity Constraints')

    #########Constraint (2)##########
    m.addConstrs((gp.quicksum(x[c3,n,c2,c1] for n in range(n_0[c1+1]))
                  <= g[c3,c1] 
                  for c1 in T for c2 in K for c3 in range(I_0[c1+1])), name="BinactivationConsistency")

    #########Constraint (3)##########
    m.addConstrs((gp.quicksum(h[u,c3,c2,0] for u in range(I_0[0]+I_0[1]) if u!=c3)
                  == 1
                for c2 in K for c3 in range(I_0[0])), name="IndegreeConstraintsCustomers")
    m.addConstrs((gp.quicksum(h[u,c3,c2,c1] for u in range(I_0[c1]+I_0[c1+1]) if u!=c3)
                  == gp.quicksum(x[c3,n,c2,c1-1] for n in range(n_0[c1]))
                for c1 in range(1,t_0) for c2 in K for c3 in range(I_0[c1])), name="IndegreeConstraintsDepots")

    #########Constraint (4)##########
    m.addConstrs((gp.quicksum(h[c3,u,c2,0] for u in range(I_0[0]+I_0[1]) if u!=c3)
                  == 1
                for c2 in K for c3 in range(I_0[0])), name="OutdegreeConstraintsCustomers")
    m.addConstrs((gp.quicksum(h[c3,u,c2,c1] for u in range(I_0[c1]+I_0[c1+1]) if u!=c3)
                  == gp.quicksum(x[c3,n,c2,c1-1] for n in range(n_0[c1]))
                for c1 in range(1,t_0) for c2 in K for c3 in range(I_0[c1])), name="OutdegreeConstraintsDepots")

    #########Constraint (5)##########
    m.addConstrs((gp.quicksum(h[c3+I_0[c1],u,c2,c1] for u in range(I_0[c1]))
                  == gp.quicksum(h[u,c3+I_0[c1],c2,c1] for u in range(I_0[c1]))
                for c1 in T for c2 in K for c3 in range(I_0[c1+1])), name="DegreeBalancingDepot")

    #########Constraint (6)##########
    m.addConstrs((h[c3+I_0[c1],c4,c2,c1] <= gp.quicksum(x[c3,n,c2,c1] for n in range(n_0[c1+1]))
                for c1 in T for c2 in K for c3 in range(I_0[c1+1]) for c4 in range(I_0[c1])), name="DepotOutEdgeConsistency")

    #########Constraint (7)##########
    m.addConstrs((h[c4,c3+I_0[c1],c2,c1] <= gp.quicksum(x[c3,n,c2,c1] for n in range(n_0[c1+1]))
                for c1 in T for c2 in K for c3 in range(I_0[c1+1]) for c4 in range(I_0[c1])), name="DepotInEdgeConsistency")

    #########Constraint (8)##########
    m.addConstrs((y[u,v,k,t] <=  V[t]*h[u,v,k,t]
                for (u,v,k,t) in comb_h), name="MaximumFlowOnEdge")

    #########Constraint (9)##########
    m.addConstrs((gp.quicksum(y[c3,u,c2,0] for u in range(I_0[0]+I_0[1]) if u!=c3) - gp.quicksum(y[u,c3,c2,0] for u in range(I_0[0]+I_0[1]) if u!=c3)
                == D[c3,c2]
                  for c2 in K for c3 in range(I_0[0])), name="FlowConstraints_Customers")
    m.addConstrs((gp.quicksum(y[c3,u,c2,c1] for u in range(I_0[c1]+I_0[c1+1]) if u!=c3) - gp.quicksum(y[u,c3,c2,c1] for u in range(I_0[c1]+I_0[c1+1]) if u!=c3)
                == gp.quicksum(y[v,I_0[c1-1]+c3,c2,c1-1] for v in range(I_0[c1-1]))
                  for c1 in range(1,t_0) for c2 in K for c3 in range(I_0[c1])), name="FlowConstraints_Depots")

    #########Constraint (10)##########
    m.addConstrs((y[c3+I_0[c1],c4,c2,c1]==0
                for c1 in T for c2 in K for c3 in range(I_0[c1+1]) for c4 in range(I_0[c1])), name="InitializeFlow")

    #########Constraint (11)##########
    m.addConstrs((y[u,v,k,t] >=0
                for (u,v,k,t) in comb_h), name="SECFlowLowerLimit")

    #########Constraint (12)##########
    m.addConstrs((z[u,v,k,t] <= I_0[t+1]*h[u,v,k,t]
                for (u,v,k,t) in comb_h), name="FDCFlowUpperLimit")

    #########Constraint (13)##########
    m.addConstrs((z[c3+I_0[c1],c4,c2,c1] == (c3+1)*h[c3+I_0[c1],c4,c2,c1]
                for c1 in T for c2 in K for c3 in range(I_0[c1+1]) for c4 in range(I_0[c1])), name="FDCFlowInitialValue")

    #########Constraint (14)##########
    m.addConstrs((z[c4,c3+I_0[c1],c2,c1] == (c3+1)*h[c4,c3+I_0[c1],c2,c1]
                for c1 in T for c2 in K for c3 in range(I_0[c1+1]) for c4 in range(I_0[c1])), name="FDCFlowFinalValue")

    #########Constraint (15)##########
    m.addConstrs((gp.quicksum(z[c3,u,c2,c1] for u in range(I_0[c1]+I_0[c1+1]) if u!=c3) - gp.quicksum(z[u,c3,c2,c1] for u in range(I_0[c1]+I_0[c1+1]) if u!=c3)
                == 0
                 for c1 in T for c2 in K for c3 in range(I_0[c1])), name="FDCFlowConstraints_Depots")

                      
    m.setObjective(gp.quicksum(g[i,t]*h_c[i,t] for (i,t) in comb_g)
              + gp.quicksum(x[i,n,k,t]*X_c[n,t] for (i,n,k,t) in comb_N)
              + gp.quicksum(c[u,v,t]*h[u,v,k,t] for (u,v,k,t) in comb_h)
                   , GRB.MINIMIZE)

    #######TIME LIMIT####################
    hardlimit = 60
    m.setParam('TimeLimit', hardlimit)
    
    m.optimize()
    
    if m.status==2:
    
        g_bar={}
        for (i,t) in comb_g:
            g_bar[i,t]=g[i,t].X
        
        h_bar={}
        for (u,v,k,t) in comb_h:
            h_bar[u,v,k,t]=h[u,v,k,t].X
        x_bar={}
        for (i,n,k,t) in comb_N:
            x_bar[i,n,k,t]=x[i,n,k,t].X
            
            
            
        ###############Lat Long###################
        lt = [i for i in data_f]
        
        lat_long=[]
        for i in lt:
            lat_long.append({
                ("Echelon"): i["echelon"],
                ("Node name"): i["node_label"],
                ("Latitude"): i["lat"],
                ("Longitude"): i["lng"]
            })
            
                ############Writing to CSV###############
        data_file = open('node_locations.csv', 'w', newline='')
    
        # create the csv writer object
        csv_writer = csv.writer(data_file)
        
        # Counter variable used for writing
        # headers to the CSV file
        count = 0
        
        for emp in lat_long:
            if count == 0:
        
                # Writing headers of CSV file
                header = emp.keys()
                csv_writer.writerow(header)
                count += 1
        
            # Writing data of CSV file
            csv_writer.writerow(emp.values())
        
        data_file.close()
        
        ###############Comprehensive Output################################    
        
        res = [i for i in data_f if not (int(i['echelon'])==1)]
        proc_list=[(i,n,t) for (i,n,k,t) in comb_N if round(x_bar[i,n,k,t])==1]
        
        facility_output=[]
        for i in res:
            if (int(i["index"])-1, int(i["echelon"])-2) in [(i,t) for (i,n,t) in proc_list]:
                capc=[n for (j,n,t) in proc_list if j==int(i["index"])-1 and t==int(i["echelon"])-2][0]
                i["routes"], i["route_costs"] = post_proc(int(i["index"])-1+I_0[int(i["echelon"])-2], capc, int(i["echelon"])-2, x_bar, h_bar, I_0, data_f, c)
                i["Capacity"]=str(M[capc,0,int(i["echelon"])-2])
                i["Capacity costs"]=str(X_c[capc,int(i["echelon"])-2])
                
                route_c=sum(i["route_costs"][j] for j in range(len(i["route_costs"])))
                
                facility_output.append({
                ("Echelon"): i["echelon"],("Facility name"): i["node_label"],
                ("Size (Kgs)"): str(M[capc,0,int(i["echelon"])-2]),
                ("# of Vehicles"): str(len(i["routes"])),
                ("Land Cost($)"): str(round(h_c[int(i["index"])-1,int(i["echelon"])-2], 2)),
                ("Facility Cost($)"): str(X_c[capc,int(i["echelon"])-2]),
                ("Total Routing cost($)"): str(round(route_c,2)),
                ("Total Cost($)"): str(round(h_c[int(i["index"])-1,int(i["echelon"])-2],2)+X_c[capc,int(i["echelon"])-2]+round(route_c,2))
                }
                )
                
            else:
                i["routes"], i["route_costs"], i["Capacity"], i["Capacity costs"]='', '', '', ''
                
        
            
        ro_keys=["lat", "lng", "location_cost", "node_label", "echelon", "index", "facility_sizes", "facility_costs", "vehicle_capacity", "vehicle_cost", "routes", "route_costs", "Capacity", "Capacity costs"]
            
        ro_res=[]
        for k in range(len(res)):
            ro_res.append({j: res[k][j] for j in ro_keys})
        
            ############Writing to CSV###############
        data_file = open('sample_output.csv', 'w', newline='')
    
        # create the csv writer object
        csv_writer = csv.writer(data_file)
        
        # Counter variable used for writing
        # headers to the CSV file
        count = 0
        
        for emp in ro_res:
            if count == 0:
        
                # Writing headers of CSV file
                header = emp.keys()
                csv_writer.writerow(header)
                count += 1
        
            # Writing data of CSV file
            csv_writer.writerow(emp.values())
        
        data_file.close()
        
        facility_file = open('facility_output.csv', 'w', newline='')
    
        # create the csv writer object
        csv_writer = csv.writer(facility_file, delimiter=';')
        
        # Counter variable used for writing
        # headers to the CSV file
        count = 0
        
        for emp in facility_output:
            if count == 0:
        
                # Writing headers of CSV file
                header = emp.keys()
                csv_writer.writerow(header)
                count += 1
        
            # Writing data of CSV file
            csv_writer.writerow(emp.values())
        
        facility_file.close()

            
            #######Writing To JSON#################
        
        #with open('data.json', 'w') as f:
        #    json.dump(res, f)
    
        
        ##################Summary Output######################
    
        sample_output=[]
        total_c=0
        for c1 in T:
            facilities=[(i) for (i,n,t) in proc_list if t==c1]
            for j in facilities:
                facilities_label=[i["node_label"] for i in data_f if int(i["echelon"])==c1+2 and int(i["index"])==j+1]
            facis=sum(x_bar[i,n,k,c1] for i in range(I_0[c1+1]) for n in range(n_0[c1+1]) for k in K)
            vehicles=sum(h_bar[i,v,k,c1] for i in range(I_0[c1], I_0[c1]+I_0[c1+1]) for v in range(I_0[c1]) for k in K)
            cost_build=sum(g_bar[i,t]*h_c[i,t] for (i,t) in comb_g if t==c1)
            size_cost=sum(x_bar[i,n,k,t]*X_c[n,t] for (i,n,k,t) in comb_N if t==c1)
            route_cost=sum(c[u,v,t]*h_bar[u,v,k,t] for (u,v,k,t) in comb_h if t==c1)
            total_c+=cost_build+size_cost+route_cost
            sample_output.append({("Echelon"): str(c1+2),
            #("Facilities locations"): facilities_label,
            ("# of Facilities"): str(int(facis)),
            ("# of Vehicles"): str(int(vehicles)),
            #("Building Cost"): str(cost_build),
            #("Size Configuration Costs"): str(size_cost),
            #("Routing Costs"): str(route_cost)},
            ("Total Cost($)"): str(round(cost_build+size_cost+route_cost,2))
            })
            
            
            ##Echelon, # of Facilities, # of Vehicles, Total cost##### with grand total
        
            ############Writing to CSV###############
        
        echelon_file = open('echelon_output.csv', 'w', newline='')
    
        # create the csv writer object
        csv_writer = csv.writer(echelon_file, delimiter=';')
        
        # Counter variable used for writing
        # headers to the CSV file
        count = 0
        
        for emp in sample_output:
            if count == 0:
        
                # Writing headers of CSV file
                header = emp.keys()
                csv_writer.writerow(header)
                count += 1
        
            # Writing data of CSV file
            csv_writer.writerow(emp.values())
        
        csv_writer.writerow(['','','TOTAL($)',str(round(total_c,2))])
        echelon_file.close()
        
            
    elif m.status==3:
        print('Model is infeasible')
    else:
        print('Model Status', m.status)


if __name__ == "__main__":
    
    main()
    #######Writing To JSON#################
    
    #with open('data.json', 'w') as f:
    #    json.dump(res, f)