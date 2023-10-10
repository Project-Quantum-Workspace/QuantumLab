import moment from 'moment';

const template = {
  id: 1,
  filename: 'Quantum Template',
  parameters:
    '[{"name":"AvailableZone","label":"Available Zone","selections":["qh2","qh2-uom"],"isInput":false},{"name":"DiskSize","label":"Disk Size","isInput":true}]',
  accessLevel: 1,
  icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgZmlsbD0idXJsKCNwYXR0ZXJuMCkiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJwYXR0ZXJuMCIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfNjc3XzY5NDg0IiB0cmFuc2Zvcm09InNjYWxlKDAuMDA4NjIwNjkpIi8+CjwvcGF0dGVybj4KPGltYWdlIGlkPSJpbWFnZTBfNjc3XzY5NDg0IiB3aWR0aD0iMTE2IiBoZWlnaHQ9IjExNiIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFIUUFBQUIwQ0FJQUFBRGIrSUZ3QUFBQUJtSkxSMFFBL3dEL0FQK2d2YWVUQUFBWkJVbEVRVlI0MnUzZGQ1eVcxWlVIOFB3YlMySldzNjY3TWJ1YXhLNmJ0YVJzaWhzVUZMdGlRWW9GdTBZalJtTWtkbnF2QTRJZ0N0SUZGQUVyTmtURkJncGl3WTY5OTE3MjZ4em41dksrTStOQW1BbThQdS9uK2N6bm5UdFB1Nzk3N2ltL2MrNmQ3M3ozRDUyTG81R083eFFRRk9BVzRCWkhBVzRCYmdGdWNSVGdGdUFXNEJaSEFXNEJiZ0Z1WXg3ZjI3VnJBVzVqSFpzZE11aG5od3lxNTRSMWQrMjY4WDU5dHpoMDhEYnRxN1pwTzJUTFF3ZHZjZWlncmRzTjJicnRrSzNhRHQ3a3dQN3I3OTZqL3N2L2JlL2U3dkN0QXhkUzAyNVpNdlhtSlZ1MEhyUmxtNitRK3RraEE3ZHFNeGh3UUlmZzNtZU02elQ4eG91bTN6UHJqc2NlV1ByUzB5KysrZVk3SDc3MTdvY3Z2dmJ1STgrOGRzTTlUNHk2K3I3elJ0N1UrdHdwMng4NTdLdHIydzUyengvdjN4ZWdteDQwd0IxMjZqQjgwUk12Ly9LWUVkOXYzdTFiQk82bUIvWS9iZEMxWDFaL1B2ejQwM2tQUG52NWRROEFhK2E4Ung5OTlyVlBQdjM4eSt3RHpZZWVmT1cyaFU5ZmZmdWpjKzU5MGpIL29lZGVlTzJkTDc3SXovcnkyWmZmZ3JqQjZETiszc2daOTkzMTBMTFBxODk0Nm9VM04yOWRPai9XMzczN3R1MnJ2RWFsZ2J2QkhqMStmK0lvQ0M1ODdNV0R6cDUwNVcwUFF5b0FldjN0RDRCeTJUVUx6NzM0cGtQUG03TFRVY1BybWZqa2NhczJRL1k1Yy94Zmg5MHdldGFDT3hjdmMzbkMrcVhYM3gxLy9ZUHU0N3N4STlvdStaZmR1Ly8zWVVQM1AydkN4QnNYdmZ6R2V6dDJ1S2h5d0RYZmYzdjhxSTMzNnpmaGhrVUVEVFNyL0JFYjd0bnIzL2ZwczBITHZ3OEpXZllzNC9UYjQwZU9tbm4vdXg5OERHNUNmVXlQR1JUSStpMTdWZ2k0UHoxNDRMeEZ6NUl2MGtyY2R1czRac085ZWpYcUUwbDN5OVBHRHB4OEYzeERvczBTMm9QazN2ZklDNzg1Ym1RbFNlN0FmYzhjditUcFY5UGtKVUgzUC9wQzN3bDNITkJwSXVqL3dmdi9lUDkrdnoveGt2WVhUajFueEJ4cTkrYjduM3IvbzAvaVFjKzg5SllIVWRhUFAvZDZ0Snc1OVBydk5lOWFJZUJ1dEZldi9jK2EySG4wTGV5K2J1Y1ErM3o2MmVlVUlOdjEzQ3R2UC9qNFM0U3JhdXJkN1M2WXVtNk5MM3hFbCttTUhzOWh6RFVMZVJUcHRwUUFLSmxFODkxUVBmejBxd3NlZTVFQlpCaDkrZWlUejU1NC9nMWYzRFk5eXd1YzNHOVcvVzdjbWdUdU9ydDAvdm5odzk1Kzc2T2I3bnZTSkEzYkJXS2dtSjVKdnQ1NDU0TWwxZWl3VG9IKzBHbDN4eDMyT24wY3hLZmM5TkNOOXo3UmUveThYeHc5UXVQMlIxNzA2cHZ2TysyMXQ5Ni9aY0ZUdHovNERIY3RqUmFJdTE1MkcvTjQ3VjFMUGN0aGJLNjVjNm4yL2hQdXFCeFhqQWNLc284Ly9ZeEIrOEZ1M2U5ZThseVNJMjdEclF1ZWhqaWc3M240ZVdJVjdjQjkvdFYzbm56aERaZXYxYXd6WkM4WWRYUDRFcDB1dXZIc0VYTzA4MzlkYnNBV1AvRnl3dlNPUmM5QzJhM1NtQm1QVjk1OEwzZmFZbXdxQVZ4dTV0QnA4L1dxeTZXMzFyaVpQWVpjTVQ4TWQzekFIZTR0NGFVV09GS2NWSU9oVVlUbS9NZVd2VTdHQjE4eC85U0IxNXpZWjZhZ0EwQVVLQ2tPNEpZdWV4MnNSSjRxU0xjMVFvT20zSFhEM1krVGE1SjczZnlsRG9hMDNQTmRVOEg5cjFiOVczUWNvODhVNG5vdHZnNlcrUEJNdG01ZlAvOXhrbXZDUW9Ibm00dVlYMG51eWYxbXU0cGNrMHJLWlBZZGo4VWQvbEoxdlhPTUFWMU1YUmlWSEZQM25QdkFNMWZOZlNSM2Z0Lzc4Qk5qTTJ6NjNWdTBHYlJ1ODY0Vm9oYis4NEIrWncyN1FmZisyRzlXN3BuUmhxbm5RbFU2QVpxazJQUW5nNlJWdXhhWDB5ZHhCeU8wemk1ZC9uWFBua3hXZ092RHR5TzJybkl0QVE5QVFmblo1MThZRlNxRm9nQTNSOEk1SXVOMWR1bGFVZUV2RTgvc1VIOGw3ZHNmTVd6RzNFY0V0Zm9QNnpCbGdHRGxBM1Q2OU9qdVY0a0xlRmZSSXU3aXV0Rzg5QU1EUmFMZmVmOWpNeUQrQ201ZVIvOUpkLzVwd0RWQzRYSFhQMGgrb2N5Ty9Ybnd0VDB1bjd0SnEzNlZ4aTFRblNZdk5acjdRTDg2OXVMOS9qcGhwNk9IODdUMG5BYWdFN0V6TEZYQU5QM1doeUc3N09XM0w1bDV2NVlQUHZvVVdVUFBPc2V2VEJiZGNsTGZXYWYwbjkycTA4VGplczY0OEpKYnVvK2R5K2pSRWhBWEFVK2VzOWlZb1lIRTAyUjU2M1pWRlVqY21JbGtEU0tpKzJnNW9mZlZoNXc3dWMzNVY0Qm03V1pkaUpncEQ0dTI1MTlCU0VrdTNIM2h2ZElBM2NiY2RzWE5EL0Y4eVRpMVM3cEpPazJDOTNGUFkyWWtuRWtuT0JQRUJvRDlwQ1VJUG8xaGFBRk43emVOS2ZzblJHaFFBOFR1SGNmNi9wdmpSMjdiZmlpd2NEZGtXYkJ3eURtVDBiV2lOVWdod0dobnFwUGYrcmZoTnpvSGR2eUJVS2FtK2FRNWk0ZGZlUThFVCtnejgvaGVWeC9WN1VxSDhPL2lHZmVHTXdkUVJCcjBRUnlVSTQ5TktKRUhJQlVGcnM3ck5ua00vNHpoM3VQUGw0Zi84S3RqUndBZFRMNXYxNzZLb1NlR1NFanF3azl1Z3d2cHpWQUZZRHF5Ni9RdmwvOXc3SDYwWDE5NkZwbHdlT2RwcHNWbXl6UHhTNTU2aGE5ZHNlQVN3QVJ1ZUFzMUdxTUxFRnQxbXRUODFERXBpZkNUZ3dic2VOUndnQW9semhoeUhTM0JUSW1KZWF4OHFXUyswa2NRdk5FK3ZldDVPcDJ6OEN0d3F5b1RYTVlkQ3J1Y2NtbmVLUHFpZHB1ZmVsbUhydE01V1BtZmZyaEhUK2IrN2ZjL0dqRHB6aEZYM1V0ZytSSlVKNXRtK2dlbTBCZG9ISHpPWktSaS9VK25qaG5HeXBUY0RmZnVSVVdDZzBpbVJuYk1Ud2J0ZHllTVN2SEZjc3g2eXg2VUNiWmJhc2UxZ2pjV2oyV1QzYUYvaVRNL3pPVU5vWWI1d3F3ZnRWNkI0RzdWZGdpTWFFYWkraFZKdGs5dmlKQkJHcmIrQzZrSVJvbW9NbWlNbUxRTmxBVnlOQW1PVVNhaWdTOFFROHR0cUVCd3R6dHNxRmpyM2tlZS96cXYzcndyanBFUHdOa3FaN2hMV29ncVJrMXdSVTZUa3BXRlc2RVg0RTY0Q3VGYmdlQnUwN1lLbE5qWStKWFBUd05HZ29zQXB0T2EvK215MFRQdnB5VVF0VWt6Y000Q1VJNXFvbnNvaW5WWHBQS0I4K2NxY2NyYXpTb09YQ1NXdm9ralVvdGNnSzRLMHZMVHhsNzdRR1I4RTNCY3F5U3RoRGQ5UjRteGtBMS9BZWJSNkZJczB1K1ZCcTdvRXlJeXIvV2NJMGZMN0RpTlpVY01SbVB3TmZGQm5xWHZRaTlLQmp2YzhIY1FSUERrdG1vcWg2R0p3UDNCYnQwNmo3NFZJdHQray9uaXFPMzlsL0dIZFo2V1dvUnFORUJVaEVnYjU3NnRRSTZYMXZEWFFPbWFFMHBQS2dyY254elVIK3RxVnE2UW9NV0J1QUVpbG90T1FMSGoxVUk1Y012d09LSUprY1hQRHgvYWtGc3BieEQ0TlJtOTBFVGc4cnFnd0g5YWlXdXBCU0RLOFdEVGR6M2xNci9TbThnejBnMHA5bzBUZ3NmUi9vM1ozRjdqYmpjcTJ6UVZNZFpFNE5JRzFDZ2FaU1d1UmU1RVBod1JNL1dXSlZneElSbXZ3eHdYdHVWYUFudUFyS2puVnNMb25KYXJFSEQxUnpTbGJDQzE3TkRob3YvWXQwL3RwYVhMQytBeFBhN3FlZm50SlpWaDNEaWNMM1dCcTVXTERIbzNQbGcwWkVXdGQwWU1PZUVYUncrdktIQkZFQ0lyc3BhRWtaU3g5UklLNVZVNU1zRjVITVcreWZma3BpeUF4cHpKcTNPQi9WV1U0UVM2Z2ovQW82Z3J1WHRzenhrdS9MK1RSbGNZdUZVMEl6Y293dGxJSy9qSUdxelZyTlJiMEI3Y1l4ejByQllsWHlsM0tWMUVDL3VpQ0RYSThraXFVK3ZLRy9pemRiMkdTVkFON2lXVnBoYklWeDc3WXYva0RXc3QxcE5WVSsxUkVsbVJVTW9oZDNKRGhHbUdGTCtGT05lbEV4d1NRczc1UnY1c3pUTm9VZ1B3VFFRdWRsR1JZWU9rdm4xVkFPY08wcEVwU1I1NU5nNkRyRStPYjcrSmRWYlRLS1p5d2c1SFZoYTRtN1VlWkFyalhsZWlyQkdQa3hTQzhxUlVod0RjVkx1WWltdmlnNk9weTgvMURsR3JXem5ncnI5SHp3c3UrVXBxR3M0UTVrY3FROGVOUlMxSWZNWlY1eHpUcjRBTDJvd2lWdWRRZmg5V0ZHKzVkWVdGdnc1bVJMY0ZBaXR4YllkdVY2bzZTQ0V2dmp6bHpaakVYR1lqRytRTHQwR2xUMzRUbmg4ZHphbllwSkdyOWY4WmZHNzdLb1VFSnJYYStmclB0RVNrcEdWQWRleWJ5RWJDdTNUWjEyVzJRQmYrNXZqS1Fxb3A4VVZPS005dVlPQTBIbmoycEVoL1ZGcFJDSlduZS95aGVrNWpqdVRHTWVoNVBpMVVnV1JhMHJCaVgvWE04YXRNZTBteWt1VTBSWHhCWUthYktINTI0YVpOSmJaTm5hRDgzZkdqb2h5eDFuUlpVQkRvR09mSStITElVdnZPMVNxbFJEeVYxWHhaOTBmOWc1L2k0MkRpdzFsR3cvLzA0QUZySHJnU0J3bzFkT2I4VVRlcmQ2czFmaGVuQ2RKMGtrdFVSMVZPRnd3NnMwTis4enk1aVJ4bGQrbGpqa2ZKcVo5SzdmSS9NV3N5eE5KdWljcHdPYkdOYXRSYUg0cFVVKzlrTmtqK3I0N2dFc1lTMmJHMEEzMzFQNWtBZnI5Rk40RXB6MVI4VlJkN0l2d1ZzMjFXdHJLU0ZVSzNIOUYxK2tGblQvN0RIMGR2MExJbmtwZUJNcGF6TXdaZEkyNUJLT2k3TWM1VCtvcEx0c3lTeEZZV0dnQjZtY3Vjay9Hckk3aFVaSzNUTS9KbXlZaHRmdWpnWWRQdUNiV1lzbVMxSGk3QktwQnh1UWtsWDZKbkIzVkJIb1c1NkYwdWhDeTlZSGZuazBaSG9aU1NhZmxIR2tPRncrRTFkUHYvSGplU3FxWEhjY3BwbkNUdVNwaWcrQ2dWWEIzQmxWS3NSd09LWFBOQ2N6eVdSdkpWenNDYXBBZitiWktpMG1BUFJNa0tIWkUrWWpNYUE2WUNCMllxMWdVQ1NFak5DN2JBVjFDYkx6K3JXYW81d0hoUUNDRGVhSy9lY2YvazFaVi9hSmpWRWR6Z29ldjZLQXY3ZXgxQzg2NTBncnk2ZG9SaDhnb1FPcXJxb2l6WFQ5a2RMcTNpQk9kZzBhdzhVWGdBVTlWZzdKS1NkTlBjT1JFUW05cTR0QklPRXlrZW1ocWxrRlp3VTE4NVAxbnlFWDFZSnJoNmdXdWlwV1UwK1VmWUNnZ3p0Q1JOKzhPV1BheUdEbDlxNGRJWGtRelNrWXRyNmtIRGsrVVJFMHhxUVJLZW53dGM4UmlPa1JUM0dEdFgvZk54MWZ3aFlwY0xIRDZzK0kzQ2pkbkFQVUNldVFPQ2ZQUFdnL01sbHUwdW5EcW11b0MzVm56ZGVmVUNsN3RqM2pHNHB3KzVqaWlaaGtSRzUxRUJDNm9MRk1WRlpVdWJlMnpicnVxNitZOExpTWtnRkVBajBBaFhUT2RWaVVIV0NoUGFnMTlGejFyQm8xSDVyWG5nVnlXbm5zVzE4Q0F0THNjT2N4VU0wdTZualowNFp6SEZRdVJMUEFTS2drV1ZpRHRsd0d3V01xMGJjQjl1dUdTU0d1eFZGV1UwaXAvTEVPOTUrdVY1MUY4T2JuaEliYzZmSWxwRmRYY2NlSzN6MVgxU25aRi9CSi9NVUxoV3BOVjNDUjUva2k2TE8ydWttaFZDY0x4SUxtRlgwRWRIR3hMd0NkczJhVFdnSkFJT2NITWw0Q29DMGNEODV1b1NSRWhmaDBzYkgvMHZqNGI1UFFBQ29nU0JGQytEN3FlNUhPV2hRT1JtOGJyS0l3NmpJc1JRZjBmelltb29YRVdsWm9uWncxRkZxMGM0NTRhcFhMVldjQ01udEc2amJWalNXT0NLN3Z0T21NY3RsM1RnUzdKRjZVLzRLaE9RNmhCeFVIQjBLNnVGZjRFc0RVQk9UZFY5ejV6UTR0UXhHMzBUNGJ2MkxsMFFFUjZFdFFDeDRUeThPaVVNY1VwREkvaTRaUlI2bXVuQU5YN29TcnBvcnpQR2VSUGFiRTBDVjAraVl6aHNMaXJQaWRJRUpZK1ZZNlR6Wk5aOFJDQ1l5Rit0QTM3cUZmNTg1QmRhZEJ5clhDdzBMN3lJWWEwTUlSc29seDRtMGVBMU8vbFM1ZzZtMFdJc1EveXBjc3lESjNLQngxV0hiUndNV3BYcW9IWkR2Y1JpekRVR1hDb3NYcHFsTnJ1eGY1SUkrcW5EdWtkazRJSTIxTUw1MTFXZUxQV25ORHhtcU9CaW0zWkRkdXM0VnY4ak9RYmlIOVZzVmFPc3hGd09kMHJLblVyWm92WGdxUE1RZFBDQ1FVWTV4UEFvVVNXWUJpKzJ6QUF4cjhZTnZSS1o1VFd2OHNDaDBjR05ZazFkUlUzUm04U1RUbVJobERIenFEZ1NNVzJEeEtFV1FGOXVVdFpyM3MyS2xGOGVQU0owTnlmTVNFamNodXNxekcxejNoVEw5VFpZUGgzSkNlRlJtREVlWkUwUHA1aWlNRVVvQjdQSCs3Z0pKNEdCTmFpUktGcGFrM3hhTThEVkIxSUpQbTlQZ3N4QldzSjg1Sk1TUmtYaFVUbkswNlFsdU1Cck5hdEhxM2Jtc1IzUWFVSlE0RzdyVnJ3b0RsWTl2RERGUWxwSk44ME9SSzRJaVRia25nNVd6b201SWxERzVoQm5TcU5rdWNCcURhNTFPU1pnTEUwSEJ5VWdWUTVvbGtwWEkzRUxWcHVGZkNOeFhrTmM5TnF1L1ZCR0VtVEV1U0c3V1FrbHhIc1lqRmpHRnNxSFh5eTJSdWlZQjF4ajVqUVdTcXhKNEVaWVFlRVNUMm94WXEzWVZ3SkFBbVZTczlZS1ZpQTduL3U4V2V1QjY3WG92a0ttVlNHRVNJU1E1bFhwVVVlTlNZQnY0MjBGMDNSaytWcE5WYzlkanl6ak0vbkNEbCthSU5sVDdPVllnRnVBV3h3RnVBVzQzeXB3NnlrZC9FY29pRWJxbGZLeWtnVFN5cjEvZWQ1bzFZTXJOa1Z1NFFwRWluNHFxZU9veW9ORmpUeENRS1pBK00vWkVvWXByc2NTcEkyWW9zU1JveDRyRVVRTjZnMEV4TEhrTERIWktoWmN1UEgrZmFWcVlwMFVod2tocVg0MFRwQ0ZFM1FnY1RqTzNnRWg0SEVxVGExRkYrTmlLdEl5VjBrZExqYnFRTUdkelhFRXlqaGlMNFpsRnhNajNqRGlLRkFVTzhZbmJRUWhxa3lMWVl3Ni94ZFRMQXdST3FQcklpMGRMS2liMUZxSXRwTGdwdldpVW51Qkpya1FyYWMxL2ZxajU5VUZZYVAxS3VpVi9BNm8xYnlPTXlwa0lTSTQxdjlVZ2hoZm9Cd2s5NERxZldxaVVkZ2EwcWVITVVpcGpzWlBxOWI3MTZ5WkVnYzYwd2xCQkFzSXZYOTBBWGtXcTJIajhrdG5MOWkzdWpBUTc1Rkx1bkJaQ2lPNTUrcUkxVlQ3am9uWEx6ZHY0SWE4SzZaekE5dzR4T2t3TmVZT3E1NVJpSkVESnRlRXJvU0lJVzdwdThIZm9YcHZWZGhKV0pEVHFQOVE1QkFuRUs0b2s1SEhORDlDOXZGYjZSMXd1S24wUGdxcTVkbFNMdDJaSXQwMHVzTHVSSWNuY0ZNaGk3MWN2TDlGbWlYRmtIbGNMbHlPZ1RlUStxWDhwNEZLWnVYQk5aNGVZem83Y0lBSlhMd2kvaitOZkRtNHlLcUFIbFVXeTh5SXFzNElVdE5TdkxRYVdMZ3M2VURKSkFFM3pRMkpOSHY4U25YSTArVEZIR1ROY2pXUmQwQlFEN2dPYzkrWkpkMlVtYzVubnF0TXN0aXhRZGVvbDBieEZuSjJEZ1NwaXBoR082dGFMY2pLbUd2bEY2cmtTSGx2T2l2Q2VZbmhhREgzOVRDdGhWUjZuNm84SlNtMDUyVVB3TTN2VExINGlZbFBPNVpGbkcwQ2hYUVRpSlFva3QxSUQ0M0RmRS9iUmFZRHY1T25KMURHb1oyTTB3cVp1QlVBMTBzYjB2UXJFamF0bHNNNW1lekJoMkgrblZteUhRZ1RGQ2xyV1pZa095WnZ2cEpQbmppK285T1NvWU1Mc3RHRVNHY2lDVlhadUE4ZWgrVWh1YUhpNVM0aHBmTWRxc3ZLcWVBWUlaTW1sU0tBYk56eTJUeTU1NlNPMHNFa3NIVlJjR1ZlMGdtaGtZMXIvVlZDS3c4dVN3MmpXSVhrR1NabXFIbUg3WHdrYmhIVkNITG5RS3FrY0I3Yyt1eFAyTnVRSXliTEhYYk0xbjZZZlZHaXpEYWErS2s5L3k3akVQZW5XRDJPZXFHUlFzbFEzSXc3TzI2azNTSDJWZkFVSjhTZHYxdTlneEdtTWQrQndFSnZpYzd5RlhFS3BUekNHOUp2b1Y3b0piZFNEbEVFRVVXRVZvQmJIQVc0YXpLNHFwSDVkOFhoVURwVlNHNmhGZ3B3aTZNQWR3MEhWeUZRcmN2OTB3cCtVWk5vTGFpeU9JUmtFVHNpcnFKRnpKT0NmU1FEemluYU1UZ3FaY296OEd3cEc0SmVZRXpjUEYvcnJxZ25ya1VRUnh3bER2YVNXaFJZQ24rRnlIRi9QeTB1RkVDV0Y2UjZzUkptWFhlOHBLdUVvR2hpL0ViZW8xWmxHM0NzQW5BRjhzb095L2V1VWgwa2dzeXJ0WnltMmhBaEtkWVVwQWRlcUNuRXR2cWlrbjh0SW14VkZJTm1WRDJIVThmZ0pIdzlVYjBpVWxHWmpDRlVPRzRqRitWTW1KUjBRaFJJNTV0dlloNlU5YVYxbWdCeUFvWStGaENqUi9MbGd3NHJyWFNoaEVYMDhraU1BRDJXQ2lubDA0Z2h3YSt1ZW5CUkdMRUlzWVJ3VUZGYnNseGFCL1E1WlRGeXJrZE5jdm1kWVJHbGhpZFVMeGpic21iZkw3VTVlcGl2QUNGM1VUQ1pxcHJWUDd1a1JCNVZvYVhkNFdJbnZsanhFbDNJMTZ3NmJONFNDK0R6dEpNaFdWaERKT0hTOGtyVGhwZWhyd0M0c1crekFzSjhCUjZDa2R3aC8vTXpGWW9sY1BNRGw2aUNzN3lkcEFlNGhGY1ZWeUJGR0lsNStjNFVHSm40cHgwcDcrRFhrbm10dkhuZm1yMEhFUFA1Y2lMM0x5SEdzUDZ4QmxNcUswMGFnQVpQbjVhMnJrUVo3d3FBS3pGbDdSS3BDWkk3MGtxSVdueDJTUldtSWpzVDhOZkhYaHgxOUtuZDNGYzNWbjVuTXgzdStFQjVnUlkxbXovSFRrckl0bkxtMDJBWTBjaTF4UExKa2tsdDZsQ3ZYeXZRSTRZbGNCR1NWcUhRN1BuSjNrcW1EditaL3lzZ1hIREtzQ0dwWXdNUzNkRytjNE8zeUZrQmNCSFMxSllFaEZrY1ZLblVFeXRrd05XNDViSURYTUtMNU1hRUlwNGJBaTQyRnR1TitWYVJHRHdreHErdUplNkxxdXNrSXprMHF5NXdhOWp1QUplMGttVUpCZm14a3JzWlViUEIrOGVTdGtpSWdGdCtKQWZYcjZESFZrdDhySHB3cFI0UW83RW5LT0JrYXVXYW1DbnpSVXUreHpCdzAxNUJ2ODQyR1NYamRZRWJhb0VuUU1sYWhncXMwTDk1RmpuUE50SGRNWVZuVk84SFVKSVB0V3dxellBQUY2eElYanF0VDdZNkl3N2pHckxNMHNaR0RSNktMNWVCemNGRjVwYjNhSldCQ3pMOHZ5ODBsSW1wK2o2aTdEQ20rUTVoMXZZbGNQT0RMVktRWEk5Qml5UlE3S2VKRjJjcXlYS0pjMFlqbTlwcGVWRDgyNU44MnhvRFEybWtqYmJEb0oxUkxXN3hqeXBLaUh5Nk5iSCs5RWJneTVaSUJrYWpQSDhPN3FyWHVmd2JYWXAraHZBU3NiQThOSkZmSTdVZUJ3UWo0eDBxTW5uQkVJZGptc0lwZVFNTEthL2tJUmk1U0w3R29xZVNpVXlpQ1daYWhSSTd4M0tTMGdtd2lQUjdXanlVb09FUGdNdzc1UHUyeVl6bHJtdkNOLzJIcFhEbWNtK2hnYXVyR2dvdVFDM1N5Q2Q0cEhzZGxvTEVLdDZBSHVKbW55MVRXQ1RpYkJxbVRZTmlTMFl0aEoybENwZUlLb2dWZTlJNUhDd0YwaDFxSkl2Sml2MlVtRkJLa09hSjNSaHlrMktvNkVGYXdqUXlpcUlKd3A3dm5jMnk1ZnRoU1ZDcFpPQXp4UDY4M3RtTVRIMUpyam9kNkxZcHRSNzdJaHRJYXc1WTlWVXB1VHhOVlFHa0k1bGdncFBVSE1OaW92bXJaeHRTRHFidlVmWml0TTNFY0ZRNU5ORXVrNnJkb1VYZnZLNUcwQkF1M2NqRGdUallONjY3TktLY0krektDekxjaE9oWlQwTFN3WlN2bWhRQmlxL2NuN3duWFdrV2l2UTBHakJXemhmVk55V1JCWHhEbktYWDRtU0hOL1RhZmkyNGhZSzRLY0F0amdMY0F0d0MzT0lvd0MzQUxjQXRqZ0xjQXR6aUtNQnRndVAvQVZodGJ0M0YvaGdGQUFBQUFFbEZUa1N1UW1DQyIvPgo8L2RlZnM+Cjwvc3ZnPgo=',
  readme: '# Hello, *world*!',
  createdAt: '',
};

const workspace = {
  id: 1,
  name: 'AWS Example Project',
  createdAt: '2023-08-10T15:04:05Z',
  lastAccessed: moment().format('YYYY-MM-DD'),
  updatedAt: moment().format('YYYY-MM-DD'),
  description: 'this is an example project',
  templateId: 1,
  state: 'Running',
  parameters: '{"Disk Size": "50G", "Available Zone": "qh2-uom"}',
  tags: 'CPU, Qiskit',
  template: template,
};
// export default {
//     'GET /api/workspaces/:id': (req: Request, res: Response) => {
//         res.send(workspace);
//     },
// };
// Export the mock data and the endpoint to be intercepted
export const workspaceIDUrl = '/api/workspaces/1*';
export const workspaceIDData = workspace;
